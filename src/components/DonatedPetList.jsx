
import React, { useState, useEffect } from "react";
import axios from "axios";

function DonatedPetsList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donate/");
        setPets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="pets-list">
      <h2>Available Pets for Adoption</h2>
      {pets.length === 0 ? (
        <p>No pets available currently.</p>
      ) : (
        <div className="pet-cards">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              {pet.image && <img src={pet.image} alt={pet.name} width="150" />}
              <h3>{pet.name}</h3>
              <p>Type: {pet.type}</p>
              <p>Age: {pet.age}</p>
              <p>{pet.description}</p>
              <button>Request Adoption</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonatedPetsList;
