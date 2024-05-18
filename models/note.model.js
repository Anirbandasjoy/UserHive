const { Schema, model } = require("../helper/require");

const noteSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

module.exports = Note;
