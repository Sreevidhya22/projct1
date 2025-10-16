const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: Date, required: true },
  symptoms: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: "Vet" },
  vetName: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
