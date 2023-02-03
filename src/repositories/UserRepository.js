const { UserModel } = require("../models");

class UserRepository {
  findUserByEmail(email) {
    return UserModel.findOne({ where: { email } });
  }
}

module.exports = new UserRepository();
