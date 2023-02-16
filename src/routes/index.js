const { Router } = require("express");

const ROUTES = require("../constants/routes");
const authRouter = require("./authRouter");
const collectionRouter = require("./collectionRouter");
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");

const rootRouter = new Router();

rootRouter.use(ROUTES.AUTH, authRouter);
rootRouter.use(ROUTES.COLLECTION, collectionRouter);
rootRouter.use(ROUTES.USER, userRouter);
rootRouter.use(ROUTES.ITEM, itemRouter);

module.exports = rootRouter;
