const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register adopter
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      location
    });
    await newUser.save();
    res.status(201).json({ message: "Adopter registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login adopter
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
    

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
