const { CollectionRepository, UserRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");

class UserController {
  async getAllCollections(req, res) {
    try {
      const id = req.params.id;
      const collections = await CollectionRepository.getAllUserCollections(id);

      res.status(200).json(collections);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await UserRepository.findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new UserController();
