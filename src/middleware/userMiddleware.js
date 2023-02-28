const ApiError = require("../errors/ApiError");
const { GET_COLLECTIONS, NOT_FOUND } = require("../constants/errorMessages");
const { UserRepository } = require("../repositories");

class UserMiddleware {
  getAllUserCollections(req, res, next) {
    try {
      const id = req.params.id;
      if (isNaN(Number(id))) {
        ApiError.badRequest(GET_COLLECTIONS);
      }
      const user = UserRepository.findUserById(id);

      if (!user) {
        ApiError.badRequest(NOT_FOUND);
      }

      next();
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new UserMiddleware();
