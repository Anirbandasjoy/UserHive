const userRouter = require("express").Router();
const {
  handleUserRegistationProcess,
  handleUserRegistation,
  handleGetCurrentUser,
} = require("../controller/user.controller");
const { isLoggedIn } = require("../middlewares/auth");

userRouter.post("/process-registation", handleUserRegistationProcess);
userRouter.post("/register-user", handleUserRegistation);
userRouter.get("/currentUser", isLoggedIn, handleGetCurrentUser);

module.exports = userRouter;
