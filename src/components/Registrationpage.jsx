import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Registrationpage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });

  // validation error messages
  const [errors, setErrors] = useState({});

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // simple regex validation
  const validate = () => {
    let tempErrors = {};

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      tempErrors.email = "Enter a valid email address";

    // phone validation (10 digits only)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone))
      tempErrors.phone = "Enter a valid 10-digit phone number";

    // password check
    if (formData.password.trim() === "")
      tempErrors.password = "Password is required";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if invalid

    try {
      const baseUrl = "http://localhost:3000/api";
      const endpoint =
        role === "user" ? `${baseUrl}/user/register` : `${baseUrl}/vet/register`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `✅ Registered successfully as ${
            role === "user" ? "Adopter" : "Veterinarian"
          }!`
        );
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          location: "",
        });
        navigate("/login");
      } else {
        alert("❌ Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Could not connect to the server. Please check backend.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        mb: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundColor: "#fafafa",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          🐾 OnePet Registration
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Create your account to join OnePet
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Register as"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="user">🐶 Pet Lover / Adopter</MenuItem>
            <MenuItem value="vet">🐾 Veterinarian</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              borderRadius: "30px",
              fontSize: "1rem",
            }}
          >
            Register
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 3 }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ borderRadius: "25px", px: 3 }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
