const ApiError = require("../errors/ApiError");
const { CollectionRepository } = require("../repositories");
const { FIND_COLLECTION } = require("../constants/errorMessages");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;

    if (!id || id === "undefined") {
      ApiError.badRequest(FIND_COLLECTION);
    }
    const collection = await CollectionRepository.getOneCollection(id);

    if (!collection) {
      ApiError.badRequest(FIND_COLLECTION);
    }
    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
