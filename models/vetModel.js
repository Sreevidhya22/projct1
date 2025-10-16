const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  specialization: { type: String },
  experience: { type: Number },
  role: { type: String, default: "veterinarian" },
  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Veterinarian", vetSchema);
