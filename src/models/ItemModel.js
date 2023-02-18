const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");
const { OPTIONAL_FIELDS } = require("../constants/databaseDefaultValues");

const ItemModel = sequelize.define("Item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  optionalFields: {
    type: DataTypes.STRING,
    defaultValue: OPTIONAL_FIELDS,
    get: function () {
      return JSON.parse(this.getDataValue("optionalFields"));
    },
    set: function (value) {
      return this.setDataValue("optionalFields", JSON.stringify(value));
    },
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  comments: {
    type: DataTypes.TEXT,
    defaultValue: OPTIONAL_FIELDS,
    get: function () {
      return JSON.parse(this.getDataValue("comments"));
    },
    set: function (value) {
      return this.setDataValue("comments", JSON.stringify(value));
    },
  },
});

ItemModel.getSearchOptions = () => ({
  type: "items",
  keys: ["title", "tags"],
});

module.exports = ItemModel;
