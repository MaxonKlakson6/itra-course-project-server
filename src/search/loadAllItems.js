const { ItemRepository } = require("../repositories");
const itemsSearch = require("../search");

module.exports = async function () {
  const items = await ItemRepository.getAll();
  itemsSearch.addAll(items);
};
