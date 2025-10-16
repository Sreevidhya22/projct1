import React from "react";

function PetDonationCard({ pet }) {
  // Get the current logged-in user's name from localStorage
  const donorName = localStorage.getItem("userName") || "Unknown";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        backgroundColor: "#d4edda",
        color: "#333",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Pet Image */}
      {pet.img ? (
        <img
          src={pet.img}
          alt={pet.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "8px",
            backgroundColor: "#c8e6c9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontSize: "14px",
          }}
        >
          No Image
        </div>
      )}

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 5px", color: "#155724" }}>
          {pet.name} ({pet.type})
        </h3>
        {pet.age && (
          <p>
            <b>Age:</b> {pet.age}
          </p>
        )}
        <p>
          <b>Location:</b> {pet.location}
        </p>
        <p>
          <b>Donor:</b> {donorName}
        </p>
        <p>
          <b>Contact:</b> {pet.contact}
        </p>
        <p>
          <b>Date:</b> {pet.date}
        </p>
      </div>
    </div>
  );
}

export default PetDonationCard;
