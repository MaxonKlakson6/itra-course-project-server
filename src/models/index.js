const UserModel = require("./UserModel");
const CollectionModel = require("./CollectionModel");

UserModel.hasMany(CollectionModel);
CollectionModel.belongsTo(UserModel);

module.exports = {
  UserModel,
  CollectionModel,
};
