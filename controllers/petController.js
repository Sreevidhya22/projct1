const Pet = require("../models/pet");
const crypto = require("crypto");

// Get all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ date: -1 });
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new pet
const addPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate OTP for verification
const generateOTP = async (req, res) => {
  try {
    const { petId, email } = req.body;
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    pet.otp = otp;
    pet.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    pet.email = email;
    await pet.save();

    // TODO: send OTP via email (using nodemailer or any service)
    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify OTP and update status
const verifyOTP = async (req, res) => {
  try {
    const { petId, otp } = req.body;
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    if (pet.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (pet.otpExpires < new Date()) return res.status(400).json({ message: "OTP expired" });

    pet.status = "Found";
    pet.otp = null;
    pet.otpExpires = null;
    await pet.save();

    res.status(200).json({ message: "Pet status updated to Found", pet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPets,
  addPet,
  generateOTP,
  verifyOTP,
};
