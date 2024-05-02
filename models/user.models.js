const { Schema, model } = require("../helper/require");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        // Bangladeshi phone number validation regex
        return /\+?(88)?0?1[3456789][0-9]{8}\b/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
});

const User = model("User", userSchema);

module.exports = User;
