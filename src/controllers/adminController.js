const { AdminRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const {
  DELETE_USER,
  MAKE_ADMIN,
  BLOCK_STATUS,
} = require("../constants/successMessages");

class AdminController {
  async getUsers(req, res) {
    try {
      const users = await AdminRepository.getUsers();

      res.status(200).json(users);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await AdminRepository.deleteUser(id);

      res.status(200).json(DELETE_USER);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async makeAdmin(req, res) {
    try {
      const id = req.params.id;
      await AdminRepository.makeAdmin(id);

      res.status(200).json(MAKE_ADMIN);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async toggleBlockStatus(req, res) {
    try {
      const id = req.params.id;
      await AdminRepository.toggleBlock(id);

      res.status(200).json(BLOCK_STATUS);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new AdminController();
