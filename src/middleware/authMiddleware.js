const signUpSchema = require("../validation/signUpSchema");
const { UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const ErrorSender = require("../errors/errorSender");
const { USER_CREATED } = require("../constants/errorMessages");

class AuthMiddleware {
  async signUp(req, res, next) {
    try {
      const { body } = req;
      signUpSchema.validateSync(body, { abortEarly: false });
      const candidate = await UserRepository.findUserByEmail(body.email);

      if (candidate) {
        ApiError.badRequest(USER_CREATED);
      }
      next();
    } catch (error) {
      ErrorSender.errorWithValidation(res, error);
    }
  }
}

module.exports = new AuthMiddleware();
