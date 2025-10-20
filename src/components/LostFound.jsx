import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LostFoundForm from "./LostFoundForm";
import PetCard from "./PetCard";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";

function LostFound() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Fetch pets from backend
  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/lostFound");
      setPets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Click on Lost pet
  const handleLostClick = (pet) => {
    if (pet.status === "Lost") {
      setSelectedPet(pet);
      setOpenModal(true);
      setEmail("");
      setOtp("");
      setOtpSent(false);
    }
  };

  // Request OTP
  const requestOtp = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/lostFound/otp", {
        petId: selectedPet._id,
        email,
      });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/lostFound/verify", {
        petId: selectedPet._id,
        otp,
      });
      alert("Pet marked as Found");
      setOpenModal(false);
      fetchPets();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "40px auto", backgroundColor: "#add8e6", borderRadius: "10px" }}>
      <button
        onClick={() => navigate("/Home")}
        style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" }}
      >
        ← Back to Home
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Lost & Found Pets</h1>

      <LostFoundForm setPets={setPets} />

      <div style={{ marginTop: "20px" }}>
        {pets.map((pet) => (
          <div key={pet._id} onClick={() => handleLostClick(pet)}>
            <PetCard pet={pet} />
          </div>
        ))}
      </div>

      {/* OTP Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'white', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Verify to mark as Found</Typography>

          {!otpSent ? (
            <>
              <TextField
                label="Your Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
              <Button variant="contained" color="primary" fullWidth onClick={requestOtp}>Send OTP</Button>
            </>
          ) : (
            <>
              <TextField
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                margin="normal"
              />
              <Button variant="contained" color="success" fullWidth onClick={verifyOtp}>Verify & Mark Found</Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LostFound;
