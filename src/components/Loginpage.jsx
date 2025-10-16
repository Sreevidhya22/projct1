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

export default function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default = adopter
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const baseUrl = "http://localhost:3000/api";

      let endpoint;
      if (role === "user") endpoint = `${baseUrl}/user/login`;
      else if (role === "vet") endpoint = `${baseUrl}/vet/login`;
      else if (role === "admin") endpoint = `${baseUrl}/admin/login`; // new admin login route

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save session
        localStorage.setItem("user", JSON.stringify(data));

        // Save userId & name
        const userId =
          role === "user"
            ? data.user._id
            : role === "vet"
            ? data.vet._id
            : data.admin._id;
        const userName =
          role === "user"
            ? data.user.name
            : role === "vet"
            ? data.vet.name
            : data.admin.name;

        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("role", role);

        alert(`Login successful! Welcome ${userName}`);

        // Redirect based on role
        if (role === "user") navigate("/Home");
        else if (role === "vet") navigate("/VeterianHomePage");
        else if (role === "admin") navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              🐾 OnePet Login
            </Typography>

            {error && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                {error}
              </Typography>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Role Dropdown */}
            <TextField
              select
              label="Login as"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="user">🐶 Pet Lover / Adopter</MenuItem>
              <MenuItem value="vet">👩‍⚕ Veterinarian</MenuItem>
              <MenuItem value="admin">🛡 Admin</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                borderRadius: "30px",
                py: 1.2,
                fontWeight: "bold",
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 2 }}
            >
              Don’t have an account?{" "}
              <Link
                to="/Register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Register here
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
            >
              &larr; Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
