const { Router } = require("express");

const userController = require("../controllers/userController");
const userMiddleware = require("../middleware/userMiddleware");

const userRouter = new Router();

userRouter.get(
  "/collection/:id",
  userMiddleware.getAllUserCollections,
  userController.getAllCollections
);

module.exports = userRouter;
