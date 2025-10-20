const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  petName: { type: String, required: true },
  vaccine: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Completed"], default: "Pending" },
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);
