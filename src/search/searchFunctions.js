const searchItems = require("./index");

const addItem = (item) => {
  console.log(item.optionalFields);
  searchItems.add(item);
};

const updateItem = (item) => {
  searchItems.replace(item);
};

const deleteOne = (item) => {
  searchItems.remove(item);
};

const deleteAll = (items) => {
  searchItems.removeAll(items);
};

module.exports = {
  addItem,
  updateItem,
  deleteOne,
  deleteAll,
};
