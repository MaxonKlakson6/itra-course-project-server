const { Router } = require("express");

const collectionController = require("../controllers/collectionController");
const verifyJwtMiddleware = require("../middleware/verifyJwtMiddleware");
const findCollectionMiddleware = require("../middleware/findCollectionMiddleware");
const validateCollectionMiddleware = require("../middleware/validateCollectionMiddleware");

const collectionRouter = new Router();

collectionRouter.get(
  "/:id",
  findCollectionMiddleware,
  collectionController.getCollection
);
collectionRouter.post(
  "/",
  verifyJwtMiddleware,
  validateCollectionMiddleware,
  collectionController.createCollection
);
collectionRouter.patch(
  "/:id",
  verifyJwtMiddleware,
  findCollectionMiddleware,
  validateCollectionMiddleware,
  collectionController.changeCollection
);
collectionRouter.delete(
  "/:id",
  verifyJwtMiddleware,
  findCollectionMiddleware,
  collectionController.deleteCollection
);

module.exports = collectionRouter;
