const { UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const getIdFromToken = require("../helpers/getTokenData");

module.exports = async function (req, res, next) {
  try {
    const { id } = getIdFromToken(req.headers.authorization);
    const user = await UserRepository.findUserById(id);

    if (!user) ApiError.unauthorized();

    if (user.isBlocked) ApiError.unauthorized();
    next();
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
