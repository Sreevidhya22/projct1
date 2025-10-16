import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import PetsIcon from "@mui/icons-material/Pets";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);
  const [vets, setVets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, usersRes, vetsRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/admin/pets"),
          axios.get("http://localhost:3000/api/admin/users"),
          axios.get("http://localhost:3000/api/admin/vets"),
          axios.get("http://localhost:3000/api/admin/appointments"),
        ]);
        setPets(petsRes.data);
        setUsers(usersRes.data);
        setVets(vetsRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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

  // Analytics Data
  const adoptedCount = pets.filter((p) => p.status === "adopted").length;
  const donatedCount = pets.filter((p) => p.status === "donated").length;

  const petTypeData = Object.entries(
    pets.reduce((acc, pet) => {
      acc[pet.type] = (acc[pet.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const appointmentsByStatus = ["pending", "approved", "rejected", "completed"].map(
    (status) => ({
      status,
      count: appointments.filter((a) => a.status === status).length,
    })
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f5", py: 5 }}>
      <Container maxWidth="xl">
        {/* Header with Logout */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h3" gutterBottom textAlign="center">
            🛡 Admin Dashboard
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#e3f2fd",
              }}
            >
              <PetsIcon fontSize="large" color="primary" />
              <Box>
                <Typography variant="h6">Total Pets</Typography>
                <Typography variant="h4">{pets.length}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#e8f5e9",
              }}
            >
              <PetsIcon fontSize="large" color="success" />
              <Box>
                <Typography variant="h6">Adopted Pets</Typography>
                <Typography variant="h4">{adoptedCount}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#fff3e0",
              }}
            >
              <PeopleIcon fontSize="large" color="warning" />
              <Box>
                <Typography variant="h6">Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#fce4ec",
              }}
            >
              <LocalHospitalIcon fontSize="large" color="error" />
              <Box>
                <Typography variant="h6">Vets</Typography>
                <Typography variant="h4">{vets.length}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 3 }}>
              <Typography variant="h6" mb={2} textAlign="center">
                Pet Types Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={petTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {petTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 3 }}>
              <Typography variant="h6" mb={2} textAlign="center">
                Appointments Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentsByStatus}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Pets & Appointments */}
        <Grid container spacing={4} mt={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Recent Pets
            </Typography>
            <Box
              sx={{
                maxHeight: 350,
                overflowY: "auto",
              }}
            >
              {pets.slice(-6).reverse().map((pet) => (
                <Paper
                  key={pet._id}
                  elevation={3}
                  sx={{ p: 2, mb: 2 }}
                >
                  <Typography><b>{pet.name}</b> ({pet.type})</Typography>
                  <Typography>Status: {pet.status}</Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Recent Appointments
            </Typography>
            <Box
              sx={{
                maxHeight: 350,
                overflowY: "auto",
              }}
            >
              {appointments.slice(-6).reverse().map((a) => (
                <Paper
                  key={a._id}
                  elevation={3}
                  sx={{ p: 2, mb: 2 }}
                >
                  <Typography>{a.ownerName} → {a.petName} ({a.petType})</Typography>
                  <Typography>Status: {a.status}</Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
