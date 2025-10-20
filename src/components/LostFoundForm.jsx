import React, { useState } from "react";
import axios from "axios";

function LostFoundForm({ fetchPets }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "Lost",
    location: "",
    contactPerson: "",
    contact: "",
    email: "",
    img: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.location) return alert("Please fill all required fields!");

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/user/lostFound", form);
      alert("Pet added successfully!");
      setForm({
        name: "",
        type: "",
        status: "Lost",
        location: "",
        contactPerson: "",
        contact: "",
        email: "",
        img: "",
      });
      document.getElementById("imgInput").value = "";
      fetchPets(); // refresh pet list in parent
    } catch (err) {
      console.error(err);
      alert("Failed to add pet. Try again.");
    } finally {
      setLoading(false);
    }
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
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
      >
        <option value="Lost">Lost</option>
        
      </select>
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
        name="contactPerson"
        placeholder={form.status === "Lost" ? "Owner Name" : "Finder Name"}
        value={form.contactPerson}
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
        type="email"
        name="email"
        placeholder="Email (for verification)"
        value={form.email}
        onChange={handleChange}
        style={{ padding: "8px", flex: "1" }}
        required
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
        disabled={loading}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 15px",
          cursor: "pointer",
          flex: "1",
        }}
      >
        {loading ? "Adding..." : "Post Pet"}
      </button>
    </form>
  );
}

export default LostFoundForm;
