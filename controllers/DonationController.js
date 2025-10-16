const PetDonation = require("../models/petDonation");
const AdoptedPet = require("../models/adoptedPet"); // new model for adopted pets

// @desc Get all donated pets
// @route GET /api/petdonations
const getAllDonations = async (req, res) => {
  try {
    const pets = await PetDonation.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Add a new pet donation
// @route POST /api/petdonations
const addPetDonation = async (req, res) => {
  try {
    const pet = await PetDonation.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: "Error creating pet donation", error: error.message });
  }
};

// @desc Adopt a pet (update donation status + create adopted record)
// @route POST /api/adoptpet
const adoptPet = async (req, res) => {
  try {
    const { petId, name, email, phone, address } = req.body;
    const pet = await PetDonation.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });


    // Update donation status to adopted
    pet.status = "adopted";
    await pet.save();

    // Add to adopted pets table
    const adoptedPet = await AdoptedPet.create({
      name: pet.name,
      type: pet.type,
      age: pet.age,
      location: pet.location,
      donorName: pet.donorName,
      contact: pet.contact,
      img: pet.img,
      adoptedBy: {
        name,
        email,
        phone,
        address,
      },
      adoptionDate: new Date(),
    });

    res.status(201).json({ message: "Pet adopted successfully", adoptedPet });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllDonations,
  addPetDonation,
  adoptPet,
};
