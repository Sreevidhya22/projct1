const bcrypt = require("bcryptjs");
const Vet = require("../models/vetModel");

// Register vet
exports.registerVet = async (req, res) => {
  try {
    const { name, email, password, phone, location, specialization, experience } = req.body;
    const existing = await Vet.findOne({ email });
    if (existing) return res.status(400).json({ message: "Veterinarian already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVet = new Vet({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      specialization,
      experience
    });
    await newVet.save();
    res.status(201).json({ message: "Veterinarian registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login vet
exports.loginVet = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vet = await Vet.findOne({ email });
    if (!vet) return res.status(404).json({ message: "Vet not found" });

    const valid = await bcrypt.compare(password, vet.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", vet });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
