const createError = require("http-errors");
const Prototype = require("../models/prototype.model");
const Comment = require("../models/comment.model");

module.exports.list = (req, res, next) => {
  const { limit = 5, 
    page = 0, 
    sort = 'startDate', 
    city, 
    title,
    radius = 5000,
    lat,
    lng
   } = req.query;

  if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
    return next(createError(400, { message: 'Invalid query parameter', errors: { limit: 'Must be >= 0' }}));
  }
  if (Number.isNaN(Number(page)) || Number(page) < 0) {
    return next(createError(400, { message: 'Invalid query parameter', errors: { page: 'Must be >= 0' } }));
  }

  const criterial = {};
  if (city) criterial['address.city'] = city;
  if (title) criterial.title = new RegExp(title, 'i');
  if (lat && lng) {
    if (Number.isNaN(Number(lat)) || !(Number(lat) >= -90 && Number(lat) <= 90)) {
      return next(createError(400, { message: 'Invalid lat parameter', errors: { lat: 'Must be -90 >= lat <= 90' } }));
    }
    if (Number.isNaN(Number(lng)) || !(Number(lng) >= -180 && Number(lng) <= 180)) {
      return next(createError(400, { message: 'Invalid lat parameter', errors: { lng: 'Must be -180 >= lat <= 180' } }));
    }
    criterial['address.location'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)]
       },
      $maxDistance: Number(radius),
      $minDistance: 0
     }
    }
  }

  Prototype.find(criterial)
    .sort({ [sort]: 'desc' })
    .limit(limit)
    .skip(limit * page)
    .populate("comments") // populate comments. thanks to Prototype virtual "comment" field
    .then((prototypes) => res.json(prototypes))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  try {
    //  Aseguramos que req.body contiene la información correcta
    const prototypeData = req.body;

    if (!prototypeData.title || !prototypeData.startDate || !prototypeData.endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (prototypeData.address?.location) {
      const { lat, lng } = prototypeData.address.location || {};
      if (!lat || !lng) {
        return res.status(400).json({ message: "Coordinates must be valid numbers" });
      }
      prototypeData.address.location = {
        type: "Point",
        coordinates: [lng, lat],
      };
    }

    //  Crear el prototipo en la base de datos
    Prototype.create(prototypeData)
      .then((createdPrototype) => res.status(201).json(createdPrototype))
      .catch((error) => {
        console.error(error);
        next(error);
      });

  } catch (error) {
    console.error("Error en create prototype:", error);
    next(error);
  }
};


module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Prototype.findById(id)
    .populate("comments")
    .then((prototype) => {
      if (!prototype) next(createError(404, "Prototype not found"));
      else res.json(prototype);
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Prototype.findByIdAndDelete(id)
    .then((prototype) => {
      if (!prototype) next(createError(404, "Prototype not found"));
      else res.status(204).json({ message: "Prototype deleted successfully" });
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = ["title", "description", "startDate", "endDate"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Prototype.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((prototype) => {
      if (!prototype) next(createError(404, "Prototype not found"));
      else res.status(201).json(prototype);
    })
    .catch((error) => next(error));
};

module.exports.createComment = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    user: req.user.id,
    prototype: req.params.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.detailComment = (req, res, next) => {
  Comment.findById(req.params.commentId)
    .populate("user") // populate user. thanks to model reference to User
    .populate("prototype") // populate prototype. thanks to model reference to Prototype
    .then((comment) => res.json(comment))
    .catch(next);
};

module.exports.deleteComment = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then((comment) => {
      if (!comment) {
        return next(createError(404, "Comment not found"));
      }
      res.status(204).send(); // No content
    })
    .catch((error) => next(error));
};
