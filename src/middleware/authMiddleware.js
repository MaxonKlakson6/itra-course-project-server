const bcrypt = require("bcrypt");

const signUpSchema = require("../validation/signUpSchema");
const signInSchema = require("../validation/signInSchema");
const { UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const ErrorSender = require("../errors/errorSender");
const {
  USER_CREATED,
  NOT_FOUND,
  WRONG_PASSWORD,
  BLOCKED,
} = require("../constants/errorMessages");

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

  async signIn(req, res, next) {
    try {
      const { body } = req;
      signInSchema.validateSync(body, { abortEarly: false });
      const user = await UserRepository.findUserByEmail(body.email);

      if (!user) {
        ApiError.badRequest(NOT_FOUND);
      }

      if (user.isBlocked) {
        ApiError.forbidden(BLOCKED);
      }

      const comparePassword = bcrypt.compareSync(
        body.password,
        user.dataValues.password
      );

      if (!comparePassword) {
        ApiError.badRequest(WRONG_PASSWORD);
      }
      next();
    } catch (error) {
      ErrorSender.errorWithValidation(res, error);
    }
  }
}

module.exports = new AuthMiddleware();
