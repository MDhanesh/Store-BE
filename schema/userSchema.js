const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require, unique: true },
    password: { type: String, require },
    phonenumber: { type: Number, require },
    isAdmin: { type: Boolean, require, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
