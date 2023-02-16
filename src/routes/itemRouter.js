const { Router } = require("express");

const itemController = require("../controllers/itemController");
const verifyJwtMiddleware = require("../middleware/verifyJwtMiddleware");
const validateItemMiddleware = require("../middleware/validateItemMiddleware");
const findItemMiddleware = require("../middleware/findItemMiddleware");

const itemRouter = new Router();

itemRouter.post(
  "/",
  verifyJwtMiddleware,
  validateItemMiddleware,
  itemController.createItem
);
itemRouter.patch(
  "/:id",
  verifyJwtMiddleware,
  findItemMiddleware,
  validateItemMiddleware,
  itemController.changeItem
);

itemRouter.delete(
  "/:id",
  verifyJwtMiddleware,
  findItemMiddleware,
  itemController.deleteItem
);

itemRouter.get("/tags", itemController.getTags);

itemRouter.get("/:id", findItemMiddleware, itemController.getItem);

module.exports = itemRouter;
