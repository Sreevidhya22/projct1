import React from "react";

function PetCard({ pet }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        backgroundColor: "#e0f7ff",
        color: "#333",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d0efff")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e0f7ff")}
    >
      {pet.img && (
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
      )}

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 5px", color: "#004d80" }}>
          {pet.name} ({pet.type})
        </h3>

        <p>
          <b>Status:</b>{" "}
          <span style={{ color: pet.status === "Lost" ? "red" : "green" }}>
            {pet.status}
          </span>
        </p>
        <p><b>Location:</b> {pet.location}</p>
        <p><b>Date:</b> {pet.date}</p>
        {pet.contactPerson && (
          <p>
            <b>{pet.status === "Lost" ? "Owner" : "Owner"}:</b>{" "}
            {pet.contactPerson}
          </p>
        )}
        {pet.contact && <p><b>Contact:</b> {pet.contact}</p>}
      </div>
    </div>
  );
}

export default PetCard;