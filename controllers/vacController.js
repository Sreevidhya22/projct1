const Vaccination = require("../models/Vaccination");

// Get all vaccinations (for vet/admin)
const getAllVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find().sort({ _id: -1 });
    res.status(200).json(vaccinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve or Reject a pending vaccination
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status = "Approved" or "Rejected"

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    const vaccination = await Vaccination.findById(id);
    if (!vaccination) return res.status(404).json({ message: "Vaccination not found" });

    if (vaccination.status !== "Pending") {
      return res.status(403).json({ message: "Only pending vaccinations can be updated" });
    }

    vaccination.status = status;
    await vaccination.save();

    res.status(200).json(vaccination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark as completed (only if approved)
const markAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const vaccination = await Vaccination.findById(id);
    if (!vaccination) return res.status(404).json({ message: "Vaccination not found" });

    if (vaccination.status !== "Approved") {
      return res.status(403).json({ message: "Only approved vaccinations can be marked as completed" });
    }

    vaccination.status = "Completed";
    await vaccination.save();

    res.status(200).json(vaccination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllVaccinations,
  updateStatus,
  markAsCompleted
};
