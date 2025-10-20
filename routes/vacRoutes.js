const express = require("express");
const router = express.Router();
const {
  getAllVaccinations,
  updateStatus,
  markAsCompleted
} = require("../controllers/vacController");

// Get all vaccinations
router.get("/", getAllVaccinations);

// Approve or Reject
router.patch("/status/:id", updateStatus);

// Mark as Completed
router.patch("/complete/:id", markAsCompleted);

module.exports = router;
