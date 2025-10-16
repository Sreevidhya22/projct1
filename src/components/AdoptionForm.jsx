import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdoptionForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const petName = location.state?.petName || "";
  const petId = location.state?.petId; // **Important: pass this to backend**

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    petName: petName,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      // **Send petId along with adopter info**
      const payload = { ...formData, petId };

      const res = await axios.post(
        "http://localhost:3000/api/user/petdonations/adoptpet",
        payload
      );

      if (res.status === 201) {
        alert(`✅ Payment Successful!\nYou have adopted ${formData.petName}.`);
        navigate("/adoption");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit adoption form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: "700px",
          p: 4,
          borderRadius: "18px",
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          🐾 Adoption Form
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Full Address"
            name="address"
            fullWidth
            multiline
            rows={3}
            required
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="Pet Name / ID"
            name="petName"
            fullWidth
            value={formData.petName}
            disabled
          />

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" color="text.secondary">
            💳 Payment (Demo)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter anything to simulate payment.
          </Typography>
          <TextField label="Card / UPI / Demo" fullWidth />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            sx={{ borderRadius: "12px", py: 1.5, fontWeight: "bold", textTransform: "none", fontSize: "1rem" }}
          >
            {loading ? "Processing..." : "Submit & Pay"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={() => navigate("/Home")}
          >
            ← Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
