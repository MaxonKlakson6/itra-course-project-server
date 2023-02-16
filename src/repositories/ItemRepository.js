const { ItemModel } = require("../models");

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
  async getItem(id) {
    return ItemModel.findOne({ where: { id } });
  }
}

module.exports = new ItemRepository();
