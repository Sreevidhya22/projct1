const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAllPets,
  updatePetStatus,
  deletePet,
  getAllUsers,
  deleteUser,
  getAllVets,
  deleteVet,
  getAllAppointments,
} = require("../../controllers/adminController");

// Admin login
router.post("/login", loginAdmin);

// Pets management
router.get("/pets", getAllPets);
router.put("/pets/:id/status", updatePetStatus);
router.delete("/pets/:id", deletePet);

// Users management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Vets management
router.get("/vets", getAllVets);
router.delete("/vets/:id", deleteVet);

// Appointments management
router.get("/appointments", getAllAppointments);

module.exports = router;
