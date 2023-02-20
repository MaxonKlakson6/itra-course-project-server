const itemSchema = require("../validation/itemSchema");
const ApiError = require("../errors/ApiError");
const { CREATE_ITEM } = require("../constants/errorMessages");
const ErrorSender = require("../errors/errorSender");
const checkCollection = require("../helpers/checkCollection");

module.exports = async function (req, res, next) {
  try {
    const { optionalFields, collectionId, ...fieldsToValidate } = req.body;

    await checkCollection(collectionId);

    itemSchema.validateSync(fieldsToValidate, { abortEarly: false });

    next();
  } catch (error) {
    ErrorSender.errorWithValidation(res, error);
  }
};
