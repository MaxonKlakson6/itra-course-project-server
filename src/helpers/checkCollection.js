const ApiError = require("../errors/ApiError");
const { FIND_COLLECTION } = require("../constants/errorMessages");
const { CollectionRepository } = require("../repositories");

module.exports = async function (id) {
  if (!id || id === "undefined") {
    ApiError.badRequest(FIND_COLLECTION);
  }
  const collection = await CollectionRepository.getOneCollection(id);

  if (!collection) {
    ApiError.badRequest(FIND_COLLECTION);
  }
};
