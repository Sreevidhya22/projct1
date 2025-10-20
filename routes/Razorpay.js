// backend/routes/Razorpay.js
const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();
console.log("🔑 Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔑 Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // ₹10
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("💥 Razorpay order creation failed:", err);
    res.status(500).json({
      message: "Payment order creation failed",
      error: err.message,
    });
  }
});

module.exports = router;
