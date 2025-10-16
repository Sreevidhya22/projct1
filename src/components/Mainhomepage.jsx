import heroImg from "../assets/hero1.jpg";
import logoImg from "../assets/logo.jpg"; 
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#000000" }}>
         🐾 OnePet                                                                                                                   
         
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#000000" }}
        >
          🐾 WELCOME TO ONEPET 🐾
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 600,
            mx: "auto",
            mb: 4,
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          We connect pet owners with trusted veterinarians, shelters, and rescue groups. Our platform makes pet adoption easier, helps you track your pet’s health records, provides access to veterinary advice, and supports community engagement for animal welfare. We believe every pet deserves love, care, and comfort.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "50px", px: 5, py: 1.5 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "50px", px: 5, py: 1.5 }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 1 }}>
        {/* You can add FeatureCard components here later */}
      </Container>

      {/* Contact Section */}
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 6,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img src={logoImg} alt="OnePet Logo" style={{ width: 80, height: "auto" }} />
        </Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          📧 Email: onepet@gmail.com
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          📍 Place: Alappuzha
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          📞 Contact Number: 90374432##
        </Typography>
      </Box>
    </Box>
  );
}

// Feature Card Component (Optional for later use)
function FeatureCard({ title, desc, img, onClick }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        elevation={4}
        sx={{
          borderRadius: 2,
          height: 300,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: onClick ? "pointer" : "default",
          "&:hover": { boxShadow: 8, transform: "scale(1.03)", transition: "0.3s" },
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: 3,
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
            {title}
          </Typography>
          <Typography variant="body2" color="white">
            {desc}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}
