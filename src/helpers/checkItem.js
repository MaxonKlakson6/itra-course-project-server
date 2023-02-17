const ApiError = require("../errors/ApiError");
const { FIND_ITEM } = require("../constants/errorMessages");
const { ItemRepository } = require("../repositories");

module.exports = async function (id) {
  if (!id || id === "undefined") {
    ApiError.badRequest(FIND_ITEM);
  }
  const item = await ItemRepository.getItem(id);

  if (!item) {
    ApiError.badRequest(FIND_ITEM);
  }
};
