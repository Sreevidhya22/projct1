import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";

export default function VetVaccinations() {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all vaccinations
  const fetchVaccinations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/vet/vaccinations");
      setVaccinations(res.data);
    } catch (err) {
      console.error("Error fetching vaccinations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccinations();
  }, []);

  // Approve or Reject
  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/vet/vaccinations/status/${id}`, { status });
      fetchVaccinations();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Mark as Completed
  const handleMarkCompleted = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/vet/vaccinations/complete/${id}`);
      fetchVaccinations();
    } catch (err) {
      console.error("Error marking completed:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Completed":
        return "primary";
      default:
        return "default";
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} align="center" color="primary">
        Vaccination Requests
      </Typography>

      <Grid container spacing={3}>
        {vaccinations.map((vacc) => (
          <Grid item xs={12} md={6} key={vacc._id}>
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold">
                    {vacc.petName}
                  </Typography>
                  <Chip
                    label={vacc.status}
                    color={getStatusColor(vacc.status)}
                    variant="outlined"
                  />
                </Box>

                <Typography mt={1}>
                  <strong>Owner:</strong> {vacc.name}
                </Typography>
                <Typography>
                  <strong>Vaccine:</strong> {vacc.vaccine}
                </Typography>
                <Typography>
                  <strong>Date:</strong> {vacc.date}
                </Typography>

                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  {/* Approve / Reject buttons */}
                  {vacc.status === "Pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusChange(vacc._id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleStatusChange(vacc._id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {/* Mark as Completed button */}
                  {vacc.status === "Approved" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMarkCompleted(vacc._id)}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
