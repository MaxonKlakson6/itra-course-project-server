const { Router } = require("express");

const itemController = require("../controllers/itemController");
const verifyJwtMiddleware = require("../middleware/verifyJwtMiddleware");
const findItemMiddleware = require("../middleware/findItemMiddleware");
const searchItems = require("../search");

const itemRouter = new Router();

itemRouter.post("/", verifyJwtMiddleware, itemController.createItem);
itemRouter.patch(
  "/:id",
  verifyJwtMiddleware,
  findItemMiddleware,
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
itemRouter.get("/search/:text", async (req, res) => {
  const { text } = req.params;
  const items = searchItems.search(text);
  res.json(items);
});

module.exports = itemRouter;
