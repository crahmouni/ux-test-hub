const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail, sendWelcomeEmail } = require("../config/mailer.config");

module.exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(400, {
          message: "User email already taken",
          errors: { email: "Already exists" },
        })
      );
    }

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      avatar: req.file?.path,
    });

    try {
      await sendValidationEmail(user);
      console.log(`✅ Email de validación enviado a ${user.email}`);
    } catch (error) {
      console.error("❌ Error enviando email de validación:", error);
    }

    try {
      await sendWelcomeEmail(user.email, user.name);
      console.log(`✅ Email de bienvenida enviado a ${user.email}`);
    } catch (error) {
      console.error("❌ Error enviando email de bienvenida:", error);
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


module.exports.update = (req, res, next) => {
  const permittedBody = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: req.body.avatar,
  };

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // merge body into req.user object
  Object.assign(req.user, permittedBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.validate = (req, res, next) => {
  User.findOne({ _id: req.params.id, activateToken: req.query.token })
    .then((user) => {
      if (user) {
        user.active = true;
        user.save().then((user) => res.json(user));
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};
