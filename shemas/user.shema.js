const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the user model. */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type:String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);