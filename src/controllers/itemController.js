const { ItemRepository } = require("../repositories");
const ApiError = require("../errors/ApiError");
const {
  CREATE_ITEM,
  CHANGE_ITEM,
  DELETE_ITEM,
} = require("../constants/successMessages");

class ItemController {
  async createItem(req, res) {
    try {
      const { body } = req;

      const newItem = {
        CollectionId: body.collectionId,
        title: body.title,
        tags: body.tags,
        optionalFields: body.optionalFields,
      };
      await ItemRepository.createItem(newItem);
      res.status(200).json(CREATE_ITEM);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async changeItem(req, res) {
    try {
      const id = req.params.id;
      const { body } = req;

      await ItemRepository.changeItem({ id, ...body });
      res.status(200).json(CHANGE_ITEM);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async deleteItem(req, res) {
    try {
      const id = req.params.id;
      await ItemRepository.deleteItem(id);
      res.status(200).json(DELETE_ITEM);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async getItem(req, res) {
    try {
      const id = req.params.id;
      const item = await ItemRepository.getItem(id);
      res.status(200).json(item);
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
  async getTags(req, res) {
    try {
      const arrayOfTags = await ItemRepository.getTags();

      const coupledTags = arrayOfTags.reduce((tags, item) => {
        tags.push(...item.dataValues.tags);
        return tags;
      }, []);

      const setTags = new Set(coupledTags);

      res.status(200).json(Array.from(setTags));
    } catch (error) {
      const unexpectedError = ApiError.internal();
      res
        .status(unexpectedError.status)
        .json({ error: unexpectedError.message });
    }
  }
}

module.exports = new ItemController();
