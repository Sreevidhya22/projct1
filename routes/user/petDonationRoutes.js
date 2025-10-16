const express = require("express");
const {
  getAllDonations,
  addPetDonation,
  adoptPet,  // new controller
} = require("../../controllers/DonationController");

const router = express.Router();

// @route GET /api/petdonations
router.get("/", getAllDonations);

// @route POST /api/petdonations
router.post("/", addPetDonation);

// @route POST /api/adoptpet
router.post("/adoptpet", adoptPet); // handles adoption form submission

module.exports = router;
