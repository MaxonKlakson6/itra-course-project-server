const { ItemRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const { FIND_ITEM } = require("../constants/errorMessages");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;

    if (isNaN(Number(id))) {
      ApiError.badRequest(FIND_ITEM);
    }
    const item = await ItemRepository.getItem(id);

    if (!item) {
      ApiError.badRequest(FIND_ITEM);
    }

    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
