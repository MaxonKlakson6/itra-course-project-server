const { Router } = require("express");

const { SIGN_UP, SIGN_IN } = require("../constants/routes");
const AuthController = require("../controllers/authController");

const authRouter = new Router();

authRouter.post(SIGN_UP, AuthController.signUp);
authRouter.post(SIGN_IN, AuthController.signIn);

module.exports = authRouter;
