const Prototype = require("../models/prototype.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const createError = require("http-errors");

/**
 * GET /api/v1/stats/prototypes
 * Obtiene los prototipos más comentados
 */
module.exports.getTopPrototypes = (req, res, next) => {
  Comment.aggregate([
    { $group: { _id: "$prototype", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "prototypes",
        localField: "_id",
        foreignField: "_id",
        as: "prototype"
      }
    },
    { $unwind: "$prototype" }
  ])
    .then((prototypes) => res.json(prototypes))
    .catch(next);
};

/**
 * GET /api/v1/stats/users
 * Obtiene los usuarios más activos (los que más han comentado)
 */
module.exports.getTopUsers = (req, res, next) => {
  Comment.aggregate([
    { $group: { _id: "$user", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" }
  ])
    .then((users) => res.json(users))
    .catch(next);
};

/**
 * GET /api/v1/stats/general
 * Obtiene estadísticas generales de la plataforma
 */
module.exports.getGeneralStats = (req, res, next) => {
  Promise.all([
    Prototype.countDocuments(),
    User.countDocuments(),
    Comment.countDocuments()
  ])
    .then(([totalPrototypes, totalUsers, totalComments]) => {
      res.json({ totalPrototypes, totalUsers, totalComments });
    })
    .catch(next);
};
