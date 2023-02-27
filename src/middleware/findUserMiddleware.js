const { UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const { FIND_USER } = require("../constants/errorMessages");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;

    if (isNaN(Number(id))) {
      ApiError.badRequest(FIND_USER);
    }
    const user = await UserRepository.findUserById(id);

    if (!user) {
      ApiError.badRequest(FIND_USER);
    }
    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
