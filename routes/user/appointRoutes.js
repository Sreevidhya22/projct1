const express = require("express");
const {
  addAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointmentStatus,
} = require("../../controllers/ApointController"); // make sure the filename matches

const router = express.Router();

// User: create appointment
router.post("/", addAppointment);

// Vet: get all appointments
router.get("/", getAllAppointments);

// User: get own appointments
router.get("/:userId", getUserAppointments);

// Vet: approve/reject appointment
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;
