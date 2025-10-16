const mongoose = require("mongoose");

const adoptedPetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    age: { type: String },
    location: { type: String, required: true },
    donorName: { type: String },
    contact: { type: String },
    img: { type: String },
    adoptedBy: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    adoptionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AdoptedPet = mongoose.model("AdoptedPet", adoptedPetSchema);

module.exports = AdoptedPet;
