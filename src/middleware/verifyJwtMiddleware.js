const { UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const getIdFromToken = require("../helpers/getIdFromToken");

module.exports = async function (req, res, next) {
  try {
    const userId = getIdFromToken(req.headers.authorization);
    const user = await UserRepository.findUserById(userId);

    if (!user) throw new Error();

    next();
  } catch (error) {
    const apiError = ApiError.unauthorized();
    res.status(apiError.status).json(apiError.message);
  }
};
