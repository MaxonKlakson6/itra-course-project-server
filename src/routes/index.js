const { Router } = require("express");

const authRouter = require("./authRouter");

const rootRouter = new Router();

rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
