const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");
const { OPTIONAL_FIELDS } = require("../constants/databaseDefaultValues");

const CollectionModel = sequelize.define("Collection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = CollectionModel;
