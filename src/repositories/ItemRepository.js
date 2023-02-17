const { ItemModel } = require("../models");
const Sequelize = require("sequelize");

class ItemRepository {
  async createItem(itemData) {
    await ItemModel.create(itemData);
  }
  async changeItem(itemData) {
    const { title, tags, optionalFields, id } = itemData;
    await ItemModel.update({ title, tags, optionalFields }, { where: { id } });
  }
  async deleteItem(id) {
    await ItemModel.destroy({ where: { id } });
  }
  async deleteItemsInCollection(CollectionId) {
    await ItemModel.destroy({ where: { CollectionId } });
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
}

module.exports = new ItemRepository();
