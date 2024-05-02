const cors = require("cors");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
module.exports = {
  cors,
  Schema,
  model,
  mongoose,
  createError,
  bcrypt,
  jwt,
  nodemailer,
};
