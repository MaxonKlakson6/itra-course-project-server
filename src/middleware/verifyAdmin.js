const getTokenData = require("../helpers/getTokenData");
const ApiError = require("../errors/ApiError");
const ROLES = require("../constants/roles");
const { NOT_ADMIN } = require("../constants/errorMessages");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    const { role } = getTokenData(token);

    if (role !== ROLES.ADMIN) ApiError.forbidden(NOT_ADMIN);
    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
