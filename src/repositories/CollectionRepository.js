const { CollectionModel, ItemModel } = require("../models");
const { Sequelize } = require("sequelize");

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
    const { title, subject, description, optionalFields, id, image } =
      changeData;

    await CollectionModel.update(
      { title, subject, description, optionalFields, image },
      { where: { id } }
    );
  }
  async getAllItems(id) {
    return ItemModel.findAll({ where: { CollectionId: id } });
  }
  async getBiggestCollections() {
    return CollectionModel.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Items.CollectionId")), "count"],
        ],
      },
      include: [
        {
          model: ItemModel,
          attributes: [],
        },
      ],
      group: ["Collection.id"],
      order: [["count", "DESC"]],
      subQuery: false,
      limit: 3,
    });
  }
}

module.exports = new CollectionRepository();
