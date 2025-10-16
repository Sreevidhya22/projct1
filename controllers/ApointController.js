const Appointment = require("../models/Appoint");

// Add new appointment
const addAppointment = async (req, res) => {
  try {
    const { ownerName, petName, petType, contact, date, symptoms, userId } = req.body;

    if (!ownerName || !petName || !petType || !contact || !date) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newAppointment = new Appointment({
      ownerName,
      petName,
      petType,
      contact,
      date,
      symptoms,
      userId,
      status: "pending", // default
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all appointments (for vets)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user-specific appointments
const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update appointment status (approve/reject/completed) by vet
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, vetId, vetName } = req.body;

    if (!["approved", "rejected", "completed", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData = { status };

    // Attach vet info if available (for any status update)
    if (vetId && vetName) {
      updateData.vetId = vetId;
      updateData.vetName = vetName;
    }

    const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointmentStatus,
};
