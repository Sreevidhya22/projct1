import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Button,
  Divider,
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const COLORS = ["#42a5f5", "#66bb6a", "#ffa726", "#ef5350"];

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
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={70} thickness={5} />
      </Box>
    );

  const adoptedCount = pets.filter((p) => p.status === "adopted").length;

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafc" }}>
      {/* HEADER BAR */}
      <Box
        sx={{
          py: 3,
          px: 5,
          background: "linear-gradient(90deg, #42a5f5, #66bb6a)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          🛡 Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#7e57c2",
            fontWeight: 600,
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* SUMMARY CARDS */}
        <Grid container spacing={3}>
          {[
            {
              title: "Total Pets",
              value: pets.length,
              icon: <PetsIcon sx={{ fontSize: 45, color: "#42a5f5" }} />,
              bg: "#e3f2fd",
            },
            {
              title: "Adopted Pets",
              value: adoptedCount,
              icon: <FavoriteIcon sx={{ fontSize: 45, color: "#66bb6a" }} />,
              bg: "#e8f5e9",
            },
            {
              title: "Users",
              value: users.length,
              icon: <PeopleIcon sx={{ fontSize: 45, color: "#ffa726" }} />,
              bg: "#fff3e0",
            },
            {
              title: "Vets",
              value: vets.length,
              icon: <LocalHospitalIcon sx={{ fontSize: 45, color: "#ef5350" }} />,
              bg: "#ffebee",
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  bgcolor: item.bg,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                {item.icon}
                <Box textAlign="right">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CHARTS */}
        <Grid container spacing={4} mt={5}>
          <Grid item xs={12} md={6}>
            <Paper elevation={5} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2} fontWeight="bold" textAlign="center">
                Pet Type Distribution
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
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={5} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2} fontWeight="bold" textAlign="center">
                Appointment Status Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentsByStatus}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#42a5f5" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* RECENT SECTION */}
        <Grid container spacing={4} mt={5}>
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                🐾 Recent Pets
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ maxHeight: 350, overflowY: "auto" }}>
                {pets.slice(-6).reverse().map((pet) => (
                  <Paper
                    key={pet._id}
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      transition: "0.3s",
                      "&:hover": { bgcolor: "#f1f8e9" },
                    }}
                  >
                    <Typography fontWeight="bold">{pet.name}</Typography>
                    <Typography color="text.secondary">
                      Type: {pet.type} | Status: {pet.status}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                📅 Recent Appointments
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ maxHeight: 350, overflowY: "auto" }}>
                {appointments.slice(-6).reverse().map((a) => (
                  <Paper
                    key={a._id}
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      transition: "0.3s",
                      "&:hover": { bgcolor: "#e3f2fd" },
                    }}
                  >
                    <Typography fontWeight="bold">
                      {a.ownerName} → {a.petName}
                    </Typography>
                    <Typography color="text.secondary">
                      Status: {a.status}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
