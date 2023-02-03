const bcrypt = require("bcrypt");

const { UserModel } = require("../models");

class AuthRepository {
  async createUser({ email, password, name }) {
    const hashPassword = await bcrypt.hash(password, 4);

    await UserModel.create({
      email,
      name,
      password: hashPassword,
    });
  }
}

module.exports = new AuthRepository();
