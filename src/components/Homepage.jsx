import heroImg from "../assets/Hero.jpg";
import adoptImg from "../assets/adopt.jpg";
import donateImg from "../assets/donation.jpg";
import commImg from "../assets/Community.jpg";
import healthImg from "../assets/healthcare.jpg";
import vetImg from "../assets/vet.jpg";
import lostImg from "../assets/lost.jpg";

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

  const handleNav = (item) => {
    switch (item) {
      case "Adoption":
        navigate("/Adoption");
        break;
      case "Healthcare":
        navigate("/Healthcare");
        break;
      case "Community":
        navigate("/Community");
        break;
      case "Lost & Found":
        navigate("/LostFound");
        break;
      case "Donation":
        navigate("/Donation");
        break;
      case "Vet Locator":
        navigate("/Vet");
        break;
      case "Contact":
        // Scroll to footer section
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ fontFamily: "sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            🐾 OnePet
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {["Adoption", "Healthcare", "Lost & Found", "Donation", "Community", "Contact"].map(
              (item) => (
                <Button key={item} onClick={() => handleNav(item)}>
                  {item}
                </Button>
              )
            )}

            <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        textAlign="center"
        sx={{
          py: 12,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.50), rgba(255,255,255,0.50)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          OnePet – A Unified Platform for Pet Adoption & Care
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 600, mx: "auto", mb: 4, fontSize: "1.1rem" }}
          color="text.secondary"
        >
          Connect with shelters, track pet health, join forums, and support animal welfare – all
          in one place.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: "50px" }}
          onClick={() => navigate("/Adoption")}
        >
          Explore Adoption
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          <FeatureCard
            title="🐶 Adoption"
            desc="Find your perfect pet with smart filters."
            img={adoptImg}
            onClick={() => navigate("/Adoption")}
          />
          <FeatureCard
            title="💉 Healthcare"
            desc="Track medical records & vaccination reminders."
            img={healthImg}
            onClick={() => navigate("/Healthcare")}
          />
          <FeatureCard
            title="🔎 Lost & Found"
            desc="Report and find missing pets easily."
            img={lostImg}
            onClick={() => navigate("/LostFound")}
          />
          <FeatureCard
            title="🏡 Donation"
            desc="Support shelters & rescue groups."
            img={donateImg}
            onClick={() => navigate("/Donation")}
          />
          <FeatureCard
            title="💬 Community Forum"
            desc="Connect with other pet lovers."
            img={commImg}
            onClick={() => navigate("/Community")}
          />
          <FeatureCard
            title="👩‍⚕ Vet Locator"
            desc="Find nearby veterinarians & shelters."
            img={vetImg}
            onClick={() => navigate("/Vet")}
          />
        </Grid>
      </Container>

      {/* Footer / Contact Details */}
      <Box
        id="footer"
        component="footer"
        sx={{
          mt: "auto",
          py: 3,
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography>Email: onepet@gmail.com</Typography>
        <Typography>Place: Pallipuram</Typography>
        <Typography>Phone: 8976546522</Typography>
      </Box>
    </Box>
  );
}

// Feature Card Component
function FeatureCard({ title, desc, img, onClick }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        elevation={4}
        sx={{
          borderRadius: 2,
          height: 180,
          width: 250,
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
            height: "90%",
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
