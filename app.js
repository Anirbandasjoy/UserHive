const express = require("express");
const app = express();
const { errorResponse } = require("./controller/response.controller");
const { cors, createError, cookieParser } = require("./helper/require");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const noteRouter = require("./routes/note.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/note", noteRouter);

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
