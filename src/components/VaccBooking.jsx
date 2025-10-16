import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VaccBooking() {
  const navigate = useNavigate(); // initialize navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    vaccine: "",
    date: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Vaccination booked successfully for ${formData.petName} (${formData.vaccine}) on ${formData.date}`);
    setFormData({ name: "", email: "", phone: "", petName: "", vaccine: "", date: "" });
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom align="center">
        📝 Vaccination Booking Form
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/vaccination")} // navigate to homepage
      >
        ← Back 
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Your Name" name="name" fullWidth required value={formData.name} onChange={handleChange} />
          <TextField label="Email" name="email" type="email" fullWidth required value={formData.email} onChange={handleChange} />
          <TextField label="Phone Number" name="phone" fullWidth required value={formData.phone} onChange={handleChange} />
          <TextField label="Pet Name" name="petName" fullWidth required value={formData.petName} onChange={handleChange} />
          <TextField label="Vaccine Name" name="vaccine" fullWidth required value={formData.vaccine} onChange={handleChange} />
          <TextField
            label="Preferred Date"
            name="date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" size="large" type="submit">
            Book Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
