const UserModel = require("./UserModel");
const CollectionModel = require("./CollectionModel");
const ItemModel = require("./ItemModel");

UserModel.hasMany(CollectionModel);
CollectionModel.belongsTo(UserModel);

CollectionModel.hasMany(ItemModel);
ItemModel.belongsTo(CollectionModel);

module.exports = {
  UserModel,
  CollectionModel,
  ItemModel,
};
