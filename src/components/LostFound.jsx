import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LostFoundForm from "./LostFoundForm";
import PetCard from "./PetCard";
import pet11Img from "../assets/pet11.jpg";
import pet12Img from "../assets/pet12.jpg";

function LostFound() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Buddy",
      type: "Cat",
      status: "Lost",
      location: "MG Road, Kochi",
      date: "2025-10-02",
      contactPerson: "Arjun Nair", // Owner
      contact: "9876543210",
      img: pet11Img,
    },
    {
      id: 2,
      name: "Mittens",
      type: "Dog",
      status: "Found",
      location: "Kaloor, Kochi",
      date: "2025-10-03",
      contactPerson: "Priya Das", // Founder
      contact: "9847123456",
      img: pet12Img,
    },
  ]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#add8e6",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/Home")}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Home
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Lost & Found Pets
      </h1>

      {/* Form to add new pet */}
      <LostFoundForm setPets={setPets} />

      {/* List of pets */}
      <div style={{ marginTop: "20px" }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default LostFound;
