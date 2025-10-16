import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Adoptionpage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pet donations
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/petdonations");
        if (!res.ok) throw new Error("Failed to fetch pets");
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleAdoptClick = (pet) => {
    // Pass both pet name and petId to the form
    navigate("/adoptform", { state: { petName: pet.name, petId: pet._id } });
  };

  const handleBackClick = () => {
    navigate("/Home");
  };

  // Separate available and adopted pets
  const availablePets = pets.filter((pet) => pet.status !== "adopted");
  const adoptedPets = pets.filter((pet) => pet.status === "adopted");

  const renderPetsGrid = (petArray, showAdoptButton = true) => (
    <Grid container spacing={4}>
      {petArray.map((pet) => (
        <Grid item xs={12} sm={6} md={3} key={pet._id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <CardMedia
              component="img"
              height="190"
              image={pet.img || "/placeholder.jpg"}
              alt={pet.name}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">{pet.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {pet.type || "Unknown type"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pet.age || "Age not specified"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📍 {pet.location}
              </Typography>

              {showAdoptButton && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleAdoptClick(pet)}
                >
                  Adopt Now
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container sx={{ py: 5 }}>
      <Box mb={3}>
        <Button variant="outlined" onClick={handleBackClick}>
          ← Back to Home
        </Button>
      </Box>

      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🐾 Adopt a Friend
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Give a loving home to a furry companion and make a lifelong friend.
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box mb={5}>
            <Typography variant="h4" gutterBottom>
              Available for Adoption
            </Typography>
            {availablePets.length === 0 ? (
              <Typography>No pets available for adoption right now 😿</Typography>
            ) : (
              renderPetsGrid(availablePets)
            )}
          </Box>

          <Box mb={5}>
            <Typography variant="h4" gutterBottom>
              Adopted Pets
            </Typography>
            {adoptedPets.length === 0 ? (
              <Typography>No pets have been adopted yet.</Typography>
            ) : (
              renderPetsGrid(adoptedPets, false)
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
