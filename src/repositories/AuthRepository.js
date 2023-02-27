const bcrypt = require("bcrypt");

const { UserModel } = require("../models");

class AuthRepository {
  async createUser({ email, password, name, role }) {
    const hashPassword = await bcrypt.hash(password, 4);

    await UserModel.create({
      email,
      name,
      password: hashPassword,
      role,
    });
  }
}

module.exports = new AuthRepository();
