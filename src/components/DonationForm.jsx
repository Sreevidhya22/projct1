import React, { useState, useEffect } from "react";
import axios from "axios";

function Donation() {
  const [pet, setPet] = useState({
    name: "",
    type: "",
    age: "",
    description: "",
    image: null,
  });
  const [pets, setPets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleFileChange = (e) => {
    setPet({ ...pet, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in pet) {
      formData.append(key, pet[key]);
    }

    try {
      await axios.post("http://localhost:8000/api/donate/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Pet donation submitted!");
      setPet({ name: "", type: "", age: "", description: "", image: null });
      fetchPets();
    } catch (err) {
      console.error(err);
      alert("Error submitting donation.");
    }
  };

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/donate/");
      setPets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="donation-container" style={styles.container}>
      <h1 style={styles.heading}>🐾 Donate a Pet 🐾</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={pet.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="type"
          placeholder="Pet Type (Dog, Cat, etc.)"
          value={pet.type}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={pet.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={pet.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <input type="file" name="image" onChange={handleFileChange} style={styles.file} />
        <button type="submit" style={styles.button}>Donate Pet</button>
      </form>

      <h2 style={styles.subHeading}>Available Pets for Adoption</h2>
      <div style={styles.petGrid}>
        {pets.length === 0 ? (
          <p>No pets available yet.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet.id} style={styles.card}>
              {pet.image && <img src={pet.image} alt={pet.name} style={styles.image} />}
              <h3>{pet.name}</h3>
              <p><b>Type:</b> {pet.type}</p>
              <p><b>Age:</b> {pet.age}</p>
              <p>{pet.description}</p>
              <button style={styles.adoptBtn}>Request Adoption</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f8eaff",
    minHeight: "100vh",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    color: "#7b2cbf",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  subHeading: {
    color: "#5a189a",
    marginTop: "40px",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "90%",
    height: "80px",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  file: { margin: "10px 0" },
  button: {
    backgroundColor: "#9d4edd",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  petGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "12px",
    width: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    height: "180px",
    objectFit: "cover",
  },
  adoptBtn: {
    backgroundColor: "#e0aaff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default Donation;
