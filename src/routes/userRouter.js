const { Router } = require("express");

const userController = require("../controllers/userController");
const userMiddleware = require("../middleware/userMiddleware");
const verifyJwt = require("../middleware/verifyJwtMiddleware");
const findUserMiddleware = require("../middleware/findUserMiddleware");

const userRouter = new Router();

userRouter.get(
  "/collection/:id",
  userMiddleware.getAllUserCollections,
  userController.getAllCollections
);

userRouter.get("/:id", verifyJwt, findUserMiddleware, userController.getUser);

module.exports = userRouter;
