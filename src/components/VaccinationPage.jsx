import React from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VaccinationPage() {
  const navigate = useNavigate();

  const vaccinations = [
    { name: "Rabies", age: "12 weeks", notes: "Booster every 1 year" },
    { name: "Distemper", age: "6 weeks", notes: "Booster every 3 weeks until 16 weeks" },
    { name: "Parvovirus", age: "6 weeks", notes: "Booster every 3 weeks until 16 weeks" },
    { name: "Hepatitis", age: "6 weeks", notes: "Booster every 3 weeks until 16 weeks" },
    { name: "Leptospirosis", age: "12 weeks", notes: "Booster yearly" },
    { name: "Bordetella", age: "8 weeks", notes: "Booster yearly or as required" },
  ];

  return (
    <Container sx={{ py: 5, minHeight: "100vh" }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/Home")}
        >
          ← Back to Home
        </Button>
      </Box>

      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom align="center">
        💉 Pet Vaccination Schedule
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <List>
          {vaccinations.map((vaccine, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`${vaccine.name} (${vaccine.age})`}
                  secondary={vaccine.notes}
                />
              </ListItem>
              {index < vaccinations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/vaccbooking")}
        >
          📝 Book Vaccination
        </Button>
      </Box>
    </Container>
  );
}
