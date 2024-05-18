const { successResponse } = require("../controller/response.controller");
const { createError, jwt } = require("../helper/require");
const { jwtAccesskey } = require("../helper/secret");

const isLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(404, "access token not found, please login");
    }
    const decoded = jwt.verify(accessToken, jwtAccesskey);
    if (!decoded) {
      throw createError(403, "Invalid access token, please login again");
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      throw createError(400, "User Already logged In");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw createError(409, "Forbidden Access");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
};
