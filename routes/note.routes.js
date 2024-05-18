const {
  handleCreateNote,
  handleFindAllNote,
} = require("../controller/note.controller");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

const noteRouter = require("express").Router();

noteRouter.post("/create", handleCreateNote);
noteRouter.get("/all-notes", isLoggedIn, isAdmin, handleFindAllNote);

module.exports = noteRouter;
