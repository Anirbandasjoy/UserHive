const express = require("express");
const app = express();
const { errorResponse } = require("./controller/response.controller");
const { cors, createError } = require("./helper/require");
const userRouter = require("./routes/user.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Server is runnnig " });
});
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
