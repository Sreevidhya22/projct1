const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, maxlength: 20 },
  location: { type: String, maxlength: 100 },
  role: { type: String, default: "adopter" }, // fixed role
  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);
