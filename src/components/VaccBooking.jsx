import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import fileDownload from "js-file-download";

export default function VaccBooking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    vaccine: "",
    date: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState(null);

  // ✅ Fetch vaccination history only once
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/vaccinations");
      setHistory(res.data);
    } catch (err) {
      console.error("❌ Error fetching vaccinations:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const alphaRegex = /^[A-Za-z\s]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email.";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be 10 digits.";
    if (!alphaRegex.test(formData.petName)) newErrors.petName = "Pet name must be letters only.";
    if (!alphaRegex.test(formData.vaccine)) newErrors.vaccine = "Vaccine name must be letters only.";
    if (!formData.date) newErrors.date = "Please select a date.";
    else if (new Date(formData.date) < new Date())
      newErrors.date = "Date must be in the future.";
    if (!formData.duration) newErrors.duration = "Select a duration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlert({ type: "error", msg: "Please fix validation errors before submitting." });
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/user/vaccinations", formData);
      setAlert({ type: "success", msg: res.data.message || "Vaccination booked successfully!" });

      setFormData({
        name: "",
        email: "",
        phone: "",
        petName: "",
        vaccine: "",
        date: "",
        duration: "",
      });

      // ✅ Instead of appending, refresh full list once
      await fetchHistory();
    } catch (error) {
      console.error("❌ Error booking vaccination:", error);
      setAlert({ type: "error", msg: "Error booking vaccination. Please try again." });
    }
  };

  // Click on history row
  const handleHistoryClick = (item) => {
    setSelectedVaccine(item);
    setOpenModal(true);
  };

  // Days remaining
  const calculateDaysRemaining = (date, duration) => {
    const courseDays =
      duration === "3 Months" ? 90 : duration === "6 Months" ? 180 : 365;
    const expiryDate = new Date(date);
    expiryDate.setDate(expiryDate.getDate() + courseDays);
    const today = new Date();
    const diff = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // Download certificate
const handleDownloadCertificate = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/user/vaccinations/certificate/${selectedVaccine._id}`,
      { responseType: "blob" } // 👈 IMPORTANT
    );
    fileDownload(res.data, `${selectedVaccine.petName}_certificate.pdf`);
  } catch (error) {
    alert("❌ Certificate can be downloaded only after completion.");
  }
};


  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
        📝 Vaccination Booking Form
      </Typography>

      <Button variant="outlined" color="secondary" sx={{ mb: 3 }} onClick={() => navigate("/vaccination")}>
        ← Back
      </Button>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>
          {alert.msg}
        </Alert>
      )}

      {/* Booking Form */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto", mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Your Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
          <TextField label="Pet Name" name="petName" value={formData.petName} onChange={handleChange} error={!!errors.petName} helperText={errors.petName} />
          <TextField label="Vaccine Name" name="vaccine" value={formData.vaccine} onChange={handleChange} error={!!errors.vaccine} helperText={errors.vaccine} />
          <TextField label="Preferred Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} error={!!errors.date} helperText={errors.date} />
          <TextField select label="Preferred Course Duration" name="duration" value={formData.duration} onChange={handleChange} error={!!errors.duration} helperText={errors.duration}>
            <MenuItem value="3 Months">3 Months</MenuItem>
            <MenuItem value="6 Months">6 Months</MenuItem>
            <MenuItem value="1 Year">1 Year</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" size="large" type="submit">
            Book Now
          </Button>
        </Box>
      </Paper>

      {/* Vaccination History */}
      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
        📜 Vaccination History
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3, maxWidth: 800, mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Pet</b></TableCell>
              <TableCell><b>Vaccine</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Duration</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center">No records found</TableCell></TableRow>
            ) : (
              history.map((item) => (
                <TableRow key={item._id} hover sx={{ cursor: "pointer" }} onClick={() => handleHistoryClick(item)}>
                  <TableCell>{item.petName}</TableCell>
                  <TableCell>{item.vaccine}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell sx={{ color: item.status === "Completed" ? "green" : item.status === "Pending" ? "orange" : "blue" }}>
                    {item.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            width: 400,
            textAlign: "center",
          }}
        >
          {selectedVaccine && (
            <>
              <Typography variant="h6" gutterBottom>
                💉 {selectedVaccine.vaccine} for {selectedVaccine.petName}
              </Typography>

              <Box sx={{ my: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon color="primary" sx={{ animation: "spin 2s linear infinite" }} />
                <Typography>
                  {calculateDaysRemaining(selectedVaccine.date, selectedVaccine.duration)} days remaining
                </Typography>
              </Box>

              <Typography sx={{ mt: 1 }}>
                Status:{" "}
                <b
                  style={{
                    color:
                      selectedVaccine.status === "Completed"
                        ? "green"
                        : selectedVaccine.status === "Pending"
                        ? "orange"
                        : "blue",
                  }}
                >
                  {selectedVaccine.status}
                </b>
              </Typography>

              <Typography sx={{ mt: 1, color: "gray" }}>
                Expiry in {calculateDaysRemaining(selectedVaccine.date, selectedVaccine.duration)} days
              </Typography>

              {selectedVaccine.status === "Completed" ? (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DownloadIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleDownloadCertificate}
                >
                  Download Certificate
                </Button>
              ) : (
                <Typography sx={{ mt: 2, color: "text.secondary" }}>
                  Certificate available after completion.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Container>
  );
}
