import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

export default function VeterianHomePage() {
  const navigate = useNavigate();
  const [vetName, setVetName] = useState("");
  const [stats, setStats] = useState({
    new: 1,
    completed: 1,
    rejected: 1,
  }); // dummy values for visualization only

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setVetName(parsed.vet?.name || "Doctor");
    } else {
      navigate("/Login");
    }

    // Optional: fetch stats from backend if available
    // fetch("http://localhost:3000/api/vet/stats")
    //   .then((res) => res.json())
    //   .then((data) => setStats(data))
    //   .catch(() => {});
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const data = [
    { name: "New", value: stats.new },
    { name: "Completed", value: stats.completed },
    { name: "Rejected", value: stats.rejected },
  ];

  const COLORS = ["#42a5f5", "#66bb6a", "#ef5350"];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #fff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            textAlign="center"
            gutterBottom
          >
            👩‍⚕ Welcome, Dr. {vetName}!
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Manage your appointments, view pet health records, and connect with pet owners 🐾
          </Typography>

          <Grid container spacing={3}>
            {/* Left: Cards */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {/* Appointments Card */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      "&:hover": { transform: "scale(1.03)" },
                      transition: "0.3s",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)",
                    }}
                  >
                    <CardContent>
                      <CalendarMonthIcon
                        sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        View Appointments
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check and manage upcoming appointments.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 2, borderRadius: "25px", px: 3 }}
                        onClick={() => navigate("/Appoint")}
                      >
                        Open
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Manage Profile */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      "&:hover": { transform: "scale(1.03)" },
                      transition: "0.3s",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)",
                    }}
                  >
                    <CardContent>
                      <ManageAccountsIcon
                        sx={{ fontSize: 40, color: "success.main", mb: 1 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        Manage Profile
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update your clinic and professional details.
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 2, borderRadius: "25px", px: 3 }}
                        onClick={() => navigate("/VetProfile")}
                      >
                        Open
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Right: Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  Appointment Overview
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={false} // disables numbers on slices
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    {/* Tooltip shows only slice name */}
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div
                              style={{
                                background: "#fff",
                                padding: "5px 10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                              }}
                            >
                              <strong>{payload[0].name}</strong>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box textAlign="center">
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: "30px",
                px: 4,
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
