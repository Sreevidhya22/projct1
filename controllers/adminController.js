const PetDonation = require("../models/petDonation");
const AdoptedPet = require("../models/adoptedPet");
const User = require("../models/userModel");
const Vet = require("../models/vetModel");
const Appointment = require("../models/Appoint");

// Get all pets
const getAllPets = async (req, res) => {
  try {
    const pets = await PetDonation.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

   
    res.json({ admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update pet status (donated/adopted)
const updatePetStatus = async (req, res) => {
  try {
    const pet = await PetDonation.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    pet.status = req.body.status;
    await pet.save();
    res.json({ message: "Status updated", pet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete pet
const deletePet = async (req, res) => {
  try {
    await PetDonation.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vets
const getAllVets = async (req, res) => {
  try {
    const vets = await Vet.find();
    res.json(vets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVet = async (req, res) => {
  try {
    await Vet.findByIdAndDelete(req.params.id);
    res.json({ message: "Vet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPets,
  updatePetStatus,
  deletePet,
  getAllUsers,
  deleteUser,
  getAllVets,
  deleteVet,
  getAllAppointments,
  loginAdmin
};
