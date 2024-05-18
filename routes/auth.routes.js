const authRouter = require("express").Router();
const {
  handleUserLogin,
  handleLogOut,
} = require("../controller/auth.controller");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");

authRouter.post("/login", isLoggedOut, handleUserLogin);
authRouter.post("/logout", isLoggedIn, handleLogOut);

module.exports = authRouter;
