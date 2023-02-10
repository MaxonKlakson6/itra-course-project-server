const jwt = require("jsonwebtoken");

const { AuthRepository, UserRepository } = require("../repositories");
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
  async signIn(req, res) {
    try {
      const { body } = req;
      const user = await UserRepository.findUserByEmail(body.email);

      const credentials = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.role,
      };

      const jwtToken = jwt.sign(credentials, process.env.JWT_SECRET);

      res.status(200).json({
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name,
        token: jwtToken,
      });
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new AuthController();
