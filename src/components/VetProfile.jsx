import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function VetProfile() {
  const [vetData, setVetData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    specialization: "",
    experience: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Get vetId from localStorage (stored after login)
  const vetId = localStorage.getItem("userId");

  // 🔹 Fetch Vet Data
  useEffect(() => {
    if (!vetId) {
      setMessage("❌ Vet not logged in. Please login again.");
      setLoading(false);
      return;
    }

    const fetchVet = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/vet/profile/${vetId}`
        );
        setVetData(res.data);
      } catch (err) {
        console.error("Error fetching vet:", err);
        setMessage("❌ Failed to load vet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVet();
  }, [vetId]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setVetData({ ...vetData, [e.target.name]: e.target.value });
  };

  // 🔹 Update profile
  const handleUpdate = async () => {
    if (!vetId) {
      setMessage("❌ Vet not logged in. Please login again.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/vet/profile/${vetId}`,
        vetData
      );
      setVetData(res.data);
      setEditMode(false);
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  // 🔹 Loading spinner
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          color="primary"
          fontWeight="bold"
        >
          🩺 Veterinarian Profile
        </Typography>

        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={vetData.name}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={vetData.email}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={vetData.phone}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={vetData.location}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Specialization"
                name="specialization"
                value={vetData.specialization}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Experience (in years)"
                name="experience"
                type="number"
                value={vetData.experience}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}
                sx={{ px: 4, py: 1 }}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdate}
                  sx={{ px: 4, py: 1 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setEditMode(false)}
                  sx={{ px: 4, py: 1 }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>

          {message && (
            <Typography
              mt={3}
              textAlign="center"
              fontWeight="bold"
              color={message.includes("✅") ? "green" : "error"}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
