const collectionSchema = require("../validation/collectionSchema");
const ApiError = require("../errors/ApiError");
const { CREATE_COLLECTION } = require("../constants/errorMessages");
const ErrorSender = require("../errors/errorSender");
const optionalFieldTypes = require("../constants/optionalFieldTypes");

module.exports = function (req, res, next) {
  try {
    const { optionalFields, image, ...fieldsToValidate } = req.body;
    collectionSchema.validateSync(fieldsToValidate, { abortEarly: false });

    const isValidOptionalFields = optionalFields.every(
      ({ type, label }) => optionalFieldTypes[type] && label
    );

    if (!isValidOptionalFields) {
      ApiError.badRequest(CREATE_COLLECTION);
    }

    next();
  } catch (error) {
    ErrorSender.errorWithValidation(res, error);
  }
};
