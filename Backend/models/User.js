// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  state: { type: String, required: true },
  idProofUrl: { type: String }, // For future file upload support
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);