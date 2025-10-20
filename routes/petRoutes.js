const express = require("express");
const router = express.Router();
const {
  getPets,
  addPet,
  generateOTP,
  verifyOTP,
} = require("../controllers/petController");

// Get all pets
router.get("/", getPets);

// Add new lost/found pet
router.post("/", addPet);

// Generate OTP
router.post("/otp", generateOTP);

// Verify OTP and update status
router.post("/verify", verifyOTP);

module.exports = router;
