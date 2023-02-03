const { AuthRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");

const { CREATE_ACCOUNT } = require("../constants/successMessages");

class AuthController {
  async signUp(req, res) {
    try {
      const { body } = req;

      await AuthRepository.createUser(body);
      res.status(200).json(CREATE_ACCOUNT);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async signIn(req, res) {}
}

module.exports = new AuthController();
