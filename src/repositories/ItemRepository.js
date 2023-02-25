const { ItemModel } = require("../models");
const Sequelize = require("sequelize");
const searchItems = require("../search");
const CollectionRepository = require("./CollectionRepository");
const {
  addItem,
  updateItem,
  deleteOne,
  deleteAll,
} = require("../search/searchFunctions");

class ItemRepository {
  async createItem(itemData) {
    const item = await ItemModel.create(itemData);
    addItem(item);
  }
  async changeItem(itemData) {
    const { title, tags, optionalFields, id } = itemData;
    await ItemModel.update({ title, tags, optionalFields }, { where: { id } });
    updateItem({ title, tags, optionalFields, id: Number(id) });
  }
  async deleteItem(id) {
    const { dataValues } = await this.getItem(id);
    await ItemModel.destroy({ where: { id } });
    deleteOne(dataValues);
  }
  async deleteItemsInCollection(CollectionId) {
    const items = await CollectionRepository.getAllItems(CollectionId);
    await ItemModel.destroy({ where: { CollectionId } });
    deleteAll(items);
  }
  async getItem(id) {
    return ItemModel.findOne({ where: { id } });
  }
  async getTags() {
    return ItemModel.findAll({
      attributes: [Sequelize.fn("DISTINCT", Sequelize.col("tags")), "tags"],
    });
  }
  async addComment(comments, id) {
    await ItemModel.update({ comments }, { where: { id } });
  }
  async updateLikes(likes, id) {
    await ItemModel.update({ likes }, { where: { id } });
  }
  async getAll() {
    return ItemModel.findAll();
  }
  async getRecent() {
    return ItemModel.findAll({
      order: [["createdAt", "DESC"]],
      limit: 6,
    });
  }
}

module.exports = new ItemRepository();
