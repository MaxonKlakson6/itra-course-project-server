const MiniSearch = require("minisearch");

const itemsSearch = new MiniSearch({
  fields: ["title", "tags", "optionalFields"],
  storeFields: ["title", "tags", "optionalFields", "id"],
  searchOptions: {
    fuzzy: 1,
  },
  extractField: (document, fieldName) => {
    if (fieldName === "optionalFields") {
      return document[fieldName].map((optionalField) => optionalField.value);
    }
    return document[fieldName];
  },
});

module.exports = itemsSearch;
