const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ["Lost", "Found"], default: "Lost" },
  location: { type: String, required: true },
  contactPerson: { type: String },
  contact: { type: String },
  email: { type: String }, // optional for verification
  img: { type: String },
  otp: { type: String }, // temporary OTP
  otpExpires: { type: Date },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pet", petSchema);
