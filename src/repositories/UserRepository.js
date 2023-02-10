const { UserModel } = require("../models");

class UserRepository {
  findUserByEmail(email) {
    return UserModel.findOne({ where: { email } });
  }
  findUserById(id) {
    return UserModel.findOne({ where: { id } });
  }
}

module.exports = new UserRepository();
