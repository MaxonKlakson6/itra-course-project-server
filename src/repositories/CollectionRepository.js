const { CollectionModel, ItemModel } = require("../models");

class CollectionRepository {
  async createCollection(dataToCreate) {
    return CollectionModel.create(dataToCreate);
  }
  async getAllUserCollections(id) {
    return CollectionModel.findAll({ where: { UserId: id } });
  }
  async getOneCollection(id) {
    return CollectionModel.findOne({ where: { id } });
  }
  async deleteCollection(id) {
    await CollectionModel.destroy({ where: { id } });
  }
  async changeCollection(changeData) {
    const { title, subject, description, optionalFields, id } = changeData;

    await CollectionModel.update(
      { title, subject, description, optionalFields },
      { where: { id } }
    );
  }
  async getAllItems(id) {
    return ItemModel.findAll({ where: { CollectionId: id } });
  }
}

module.exports = new CollectionRepository();
