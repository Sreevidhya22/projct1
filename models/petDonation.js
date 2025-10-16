const mongoose = require("mongoose");

const petDonationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    age: { type: String },
    location: { type: String, required: true },
    donorName: { type: String },
    contact: { type: String },
    img: { type: String }, // base64 image or URL
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    status: { type: String, enum: ["donated", "adopted"], default: "donated" }, // new field
  },
  { timestamps: true }
);

const PetDonation = mongoose.model("PetDonation", petDonationSchema);

module.exports = PetDonation;
