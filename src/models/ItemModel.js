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
    allowNull: true,
    get: function () {
      return JSON.parse(this.getDataValue("optionalFields"));
    },
    set: function (value) {
      return this.setDataValue("optionalFields", JSON.stringify(value));
    },
  },
});

module.exports = ItemModel;
