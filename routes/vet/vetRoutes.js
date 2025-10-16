const express = require("express");
const { registerVet, loginVet } = require("../../controllers/vetController");
const router = express.Router();

router.post("/register", registerVet);
router.post("/login", loginVet);


const Veterinarian = require("../../models/vetModel");
const Appointment = require("../../models/Appoint")

// Get vet profile
router.get("/profile/:id", async (req, res) => {
  try {
    const vet = await Veterinarian.findById(req.params.id);
    if (!vet) return res.status(404).json({ message: "Vet not found" });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/stats/:vetId", async (req, res) => {
  try {
    const { vetId } = req.params;

    // ✅ Count appointments by status
    const newAppointments = await Appointment.countDocuments({
      vetId,
      status: "Pending",
    });
    const completedAppointments = await Appointment.countDocuments({
      vetId,
      status: "Completed",
    });
    const rejectedAppointments = await Appointment.countDocuments({
      vetId,
      status: "Rejected",
    });

    return res.json({
      new: newAppointments,
      completed: completedAppointments,
      rejected: rejectedAppointments,
    });
  } catch (err) {
    console.error("Error fetching vet stats:", err);
    res.status(500).json({ error: "Failed to fetch vet stats" });
  }
});


// Update vet profile
router.put("/profile/:id", async (req, res) => {
  try {
    const vet = await Veterinarian.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: "Failed to update vet profile" });
  }
});



module.exports = router;
