const getTokenData = require("../helpers/getTokenData");
const {
  UserRepository,
  CollectionRepository,
  ItemRepository,
} = require("../repositories");
const {
  CHANGE_COLLECTION,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
} = require("../constants/successMessages");
const ApiError = require("../errors/ApiError");

class CollectionController {
  async getCollection(req, res) {
    try {
      const collectionId = req.params.id;
      const collection = await CollectionRepository.getOneCollection(
        collectionId
      );

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
      const { userId, ...otherFields } = body;
      const user = await UserRepository.findUserById(userId);

      await CollectionRepository.createCollection({
        UserId: userId,
        ownerName: user.name,
        ...otherFields,
      });
      res.status(200).json(CREATE_COLLECTION);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async changeCollection(req, res) {
    try {
      const collectionId = req.params.id;
      const { body } = req;

      await CollectionRepository.changeCollection({
        id: collectionId,
        ...body,
      });

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
      const collectionId = req.params.id;
      await ItemRepository.deleteItemsInCollection(collectionId);
      await CollectionRepository.deleteCollection(collectionId);
      res.status(200).json(DELETE_COLLECTION);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async getCollectionItems(req, res) {
    const id = req.params.id;

    const items = await CollectionRepository.getAllItems(id);

    res.status(200).json(items);
  }
  async getBiggestCollections(req, res) {
    try {
      const items = await CollectionRepository.getBiggestCollections();
      res.status(200).json(items);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new CollectionController();
