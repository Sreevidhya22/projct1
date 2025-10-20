import React, { useState } from "react";

function PetDonationForm({ setPets }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    location: "",
    donorName: "",
    contact: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.name.trim()) {
      alert("Pet Name is required");
      return false;
    }
    if (!form.type.trim()) {
      alert("Pet Type is required");
      return false;
    }
    
    if (!form.location.trim()) {
      alert("Location is required");
      return false;
    }
    if (form.contact && !/^\d{10}$/.test(form.contact)) {
      alert("Contact number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newPet = {
      ...form,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("http://localhost:3000/api/user/petdonations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPet),
      });

      if (res.ok) {
        const data = await res.json();
        setPets((prev) => [data, ...prev]);
        alert("Pet donation submitted successfully!");
      } else {
        alert("Failed to submit donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Something went wrong. Please try again.");
    }

    setForm({
      name: "",
      type: "",
      age: "",
      location: "",
      donorName: "",
      contact: "",
      img: "",
    });
    document.getElementById("imgInput").value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={form.name}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Pet Type"
        value={form.type}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
        required
      />
      <input
        type="text"
        name="age"
        placeholder="Pet Age"
        value={form.age}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
        required
      />
      <input
        type="text"
        name="donorName"
        placeholder="Donor Name"
        value={form.donorName}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={form.contact}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
      />
      <input
        type="file"
        id="imgInput"
        name="img"
        accept="image/*"
        onChange={handleChange}
        style={{ flex: "1" }}
      />

      <button
        type="submit"
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Donate Pet
      </button>
    </form>
  );
}

export default PetDonationForm;
