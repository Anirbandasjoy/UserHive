const sendingEmail = require("../helper/email");
const createToken = require("../helper/jsonwebToken");
const { bcrypt, createError, jwt } = require("../helper/require");
const { SECRETKEY, clientUrl } = require("../helper/secret");
const User = require("../models/user.models");
const { successResponse } = require("./response.controller");

const handleUserRegistationProcess = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await User.exists({ email });
    if (userExists) {
      throw createError(403, "User already exists");
    }

    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone,
    };
    const token = createToken(newUser, SECRETKEY, "10m");

    const emailData = {
      email: email,
      subject: "Activation Email",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Activation Email</title>
            <style>
              /* Add your custom styles here */
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                color: #666;
              }
              .button {
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Activation Email</h1>
              <p>Please activate your email by clicking the button below:</p>
              <a class="button" href=${clientUrl}/user/activate/${token}">Activate</a>
            </div>
          </body>
          </html>
        `,
    };

    try {
      await sendingEmail(emailData);
    } catch (error) {
      console.log(error);
    }

    successResponse(res, {
      message: `please verfiy your email address : ${email}`,
      payload: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleUserRegistation = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(404, "token not found");
    const decoded = jwt.verify(token, SECRETKEY);
    if (!decoded) throw createError(409, "User not registerd invalid token");
    const userExists = await User.exists({ email: decoded.email });
    if (userExists) {
      throw createError(403, "User already exists");
    }
    await User.create(decoded);
    successResponse(res, {
      message: "User Registation Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCurrentUser = async (req, res, next) => {
  try {
    successResponse(res, {
      payload: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleUserRegistationProcess,
  handleUserRegistation,
  handleGetCurrentUser,
};
