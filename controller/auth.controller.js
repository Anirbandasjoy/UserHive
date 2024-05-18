const createToken = require("../helper/jsonwebToken");
const { createError, bcrypt } = require("../helper/require");
const { jwtAccesskey } = require("../helper/secret");
const User = require("../models/user.models");
const { successResponse } = require("./response.controller");

const handleUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found with this email , please sing up");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createError(403, "Email/Passowrd did't match");
    }
    const accessToken = createToken({ user }, jwtAccesskey, "5m");
    res.cookie("accessToken", accessToken, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    successResponse(res, {
      message: "Login Successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const handleLogOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    successResponse(res, {
      message: "Logout Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleUserLogin,
  handleLogOut,
};
