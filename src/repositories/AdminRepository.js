const { UserModel } = require("../models");
const ROLES = require("../constants/roles");
const UserRepository = require("./UserRepository");
const { where } = require("sequelize");

class AdminRepository {
  async getUsers() {
    return UserModel.findAll({
      order: [["name", "ASC"]],
    });
  }
  async deleteUser(id) {
    await UserModel.destroy({ where: { id } });
  }
  async makeAdmin(id) {
    await UserModel.update({ role: ROLES.ADMIN }, { where: { id } });
  }
  async toggleBlock(id) {
    const user = await UserRepository.findUserById(id);
    await UserModel.update({ isBlocked: !user.isBlocked }, { where: { id } });
  }
}

module.exports = new AdminRepository();
