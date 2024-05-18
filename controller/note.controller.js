const Note = require("../models/note.model");
const { successResponse } = require("./response.controller");
const handleCreateNote = async (req, res, next) => {
  try {
    await Note.create(req.body);
    successResponse(res, {
      statusCode: 201,
      message: "Note was created",
    });
  } catch (error) {
    next(error);
  }
};

const handleFindAllNote = async (req, res, next) => {
  try {
    const notes = await Note.find();
    successResponse(res, {
      message: "Find all notes",
      payload: notes,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleCreateNote,
  handleFindAllNote,
};
