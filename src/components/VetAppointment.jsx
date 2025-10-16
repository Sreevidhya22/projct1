import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";

export default function VetAppointment() {
  const [appointments, setAppointments] = useState([]);
  const vetId = localStorage.getItem("vetId");   // logged-in vet
  const vetName = localStorage.getItem("userName");
  console.log(vetName)

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vet/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/vet/appointments/${id}/status`, {
        status: newStatus,
        vetId,
        vetName,
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/vet/appointments/${id}/status`, {
        status: "completed",
        vetName,
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#ffe0b3";
      case "approved": return "#d6f5d6";
      case "rejected": return "#ffcccc";
      case "completed": return "#28a745"; // solid green
      default: return "#fff";
    }
  };

  const getTextColor = (status) => status === "completed" ? "#fff" : "#000";

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        🗓 Vet Appointments
      </Typography>

      <Grid container spacing={3}>
        {appointments.map((appt) => (
          <Grid item xs={12} sm={6} md={4} key={appt._id}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: getStatusColor(appt.status),
              color: getTextColor(appt.status)
            }}>
              <Typography variant="h6">{appt.petName}</Typography>
              <Typography>Owner: {appt.ownerName}</Typography>
              <Typography>Date: {new Date(appt.date).toLocaleString()}</Typography>
              <Typography>Symptoms: {appt.symptoms || "N/A"}</Typography>
              <Typography>Status: {appt.status}</Typography>
              {appt.vetName && <Typography>Vet: {appt.vetName}</Typography>}

              {appt.status === "pending" && (
                <Select
                  value=""
                  onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "#fff" }}
                >
                  <MenuItem value="approved">Approve</MenuItem>
                  <MenuItem value="rejected">Reject</MenuItem>
                </Select>
              )}

              {appt.status === "approved" && (
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => markCompleted(appt._id)}
                >
                  Mark Completed
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
