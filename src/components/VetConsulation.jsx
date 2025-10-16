import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VetConsultation() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // logged-in user ID

  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    petType: "",
    contact: "",
    date: "",
    symptoms: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchAppointments = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:3000/api/user/appointments/${userId}`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch appointments");
    }
  };

  useEffect(() => { fetchAppointments(); }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!userId) { setError("User not logged in"); return; }

    try {
      const payload = { ...formData, userId };
      const res = await axios.post("http://localhost:3000/api/user/appointments", payload);
      if (res.status === 201) {
        setSubmitted(!submitted);
        setFormData({ ownerName: "", petName: "", petType: "", contact: "", date: "", symptoms: "" });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book appointment");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending": return { color: "orange", fontWeight: "bold" };
      case "rejected": return { color: "red", fontWeight: "bold" };
      case "approved": return { backgroundColor: "#d4edda", padding: "4px", borderRadius: "4px", fontWeight: "bold" };
      case "completed": return { backgroundColor: "#28a745", color: "#fff", padding: "4px", borderRadius: "4px", fontWeight: "bold" };
      default: return {};
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vet Consultation Booking
      </Typography>

      {submitted && (
        <Typography variant="subtitle1" color="green" align="center">
          Appointment booked successfully! Waiting for vet approval.
        </Typography>
      )}
      {error && (
        <Typography variant="subtitle1" color="error" align="center">
          {error}
        </Typography>
      )}

      {/* Appointment Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Pet Name" name="petName" value={formData.petName} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Pet Type (Dog/Cat/etc.)" name="petType" value={formData.petType} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Contact (Phone or Email)" name="contact" value={formData.contact} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Preferred Date & Time" name="date" type="datetime-local" value={formData.date} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField label="Symptoms / Reason" name="symptoms" value={formData.symptoms} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Book Appointment
        </Button>

        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/Vet")}>
          Back
        </Button>
      </Box>

      {/* User's Appointments List */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Your Appointments
        </Typography>
        {appointments.length === 0 ? (
          <Typography>No appointments booked yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {appointments.map((appt) => (
              <Grid item xs={12} key={appt._id}>
                <Paper sx={{ p: 2 }}>
                  <Typography><strong>Pet Name:</strong> {appt.petName}</Typography>
                  <Typography><strong>Pet Type:</strong> {appt.petType}</Typography>
                  <Typography><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</Typography>
                  <Typography sx={getStatusStyles(appt.status)}><strong>Status:</strong> {appt.status}</Typography>
                  <Typography><strong>Symptoms:</strong> {appt.symptoms || "N/A"}</Typography>
                  {/* Display assigned vet */}
                  {appt.vetName && (
                    <Typography><strong>Assigned Vet:</strong> {appt.vetName}</Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
