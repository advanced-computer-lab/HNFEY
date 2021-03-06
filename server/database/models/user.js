const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    telephoneNumbers: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
