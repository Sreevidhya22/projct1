import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetDonationForm from "./PetDonationForm";
import PetDonationCard from "./PetDonationCard";

function PetDonation() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  // Fetch all donations from backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/petdonations");
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pet donations:", error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#e6ffe6",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/Home")}
        style={{
          padding: "10px 15px",
          backgroundColor: "#28a745",
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
        Pet Donations
      </h1>

      <PetDonationForm setPets={setPets} />

      <div style={{ marginTop: "20px" }}>
        {pets.length > 0 ? (
          pets.map((pet) => <PetDonationCard key={pet._id} pet={pet} />)
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>
            No donations available yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default PetDonation;
