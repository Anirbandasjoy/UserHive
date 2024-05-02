const userRouter = require("express").Router();
const {
  handleUserRegistationProcess,
  handleUserRegistation,
} = require("../controller/user.controller");

userRouter.post("/process-registation", handleUserRegistationProcess);
userRouter.post("/register-user", handleUserRegistation);

module.exports = userRouter;
