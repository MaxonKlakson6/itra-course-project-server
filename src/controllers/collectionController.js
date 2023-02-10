const getIdFromToken = require("../helpers/getIdFromToken");
const { UserRepository, CollectionRepository } = require("../repositories");
const {
  CHANGE_COLLECTION,
  DELETE_COLLECTION,
} = require("../constants/successMessages");
const ApiError = require("../errors/ApiError");

class CollectionController {
  async getCollection(req, res) {
    try {
      const id = req.params.id;
      const collection = await CollectionRepository.getOneCollection(id);

      res.status(200).json(collection);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async createCollection(req, res) {
    try {
      const { body } = req;
      const id = getIdFromToken(req.headers.authorization);
      const user = await UserRepository.findUserById(id);

      const newCollection = await CollectionRepository.createCollection({
        UserId: id,
        ownerName: user.name,
        ...body,
      });
      res.status(200).json(newCollection);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async changeCollection(req, res) {
    try {
      const id = req.params.id;
      const { body } = req;

      await CollectionRepository.changeCollection({ id, ...body });

      res.status(200).json(CHANGE_COLLECTION);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async deleteCollection(req, res) {
    try {
      const id = req.params.id;
      await CollectionRepository.deleteCollection(id);

      res.status(200).json(DELETE_COLLECTION);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new CollectionController();
