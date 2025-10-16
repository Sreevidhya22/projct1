// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/User"); // or separate admin model
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare password (plain or hashed)
    if (password !== admin.password)
      return res.status(400).json({ message: "Incorrect password" });

    res.json({ admin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
