require("dotenv").config();
const PORT = process.env.PORT || 4000;
const dbURL = process.env.dbURL;
const SECRETKEY = process.env.SECRETKEY;
const smtpUserName = process.env.SMTPUSERNAME;
const smtpPassword = process.env.SMTPPASSWORD;

module.exports = {
  PORT,
  dbURL,
  SECRETKEY,
  smtpUserName,
  smtpPassword,
};
