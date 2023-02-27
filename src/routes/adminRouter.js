const { Router } = require("express");

const verifyAdmin = require("../middleware/verifyAdmin");
const verifyJwt = require("../middleware/verifyJwtMiddleware");
const findUserMiddleware = require("../middleware/findUserMiddleware");
const adminController = require("../controllers/adminController");

const adminRouter = new Router();

adminRouter.get("/users", verifyJwt, verifyAdmin, adminController.getUsers);
adminRouter.delete(
  "/user/:id",
  verifyJwt,
  verifyAdmin,
  findUserMiddleware,
  adminController.deleteUser
);
adminRouter.patch(
  "/make-admin/:id",
  verifyJwt,
  verifyAdmin,
  findUserMiddleware,
  adminController.makeAdmin
);
adminRouter.patch(
  "/block-status/:id",
  verifyJwt,
  verifyAdmin,
  findUserMiddleware,
  adminController.toggleBlockStatus
);

module.exports = adminRouter;
