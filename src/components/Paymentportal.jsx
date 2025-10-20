import React, { useState } from "react";
import { Box, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

export default function PaymentPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const [successPopup, setSuccessPopup] = useState(false);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const generateCertificate = () => {
  const doc = new jsPDF('landscape', 'pt', 'a4'); // Landscape orientation

  // Page width and height
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color (light pastel)
  doc.setFillColor(230, 245, 255); // RGB
  doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Fill entire page

  // Decorative border
  doc.setLineWidth(4);
  doc.setDrawColor(0, 120, 255); // Blue border
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

  // Title with fancy font
  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(36);
  doc.setTextColor(0, 80, 180);
  doc.text(" Pet Adoption Certificate ", pageWidth / 2, 120, { align: "center" });

  // Add adopter details
  doc.setFont("times", "normal");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `This is to certify that ${formData.name}`,
    pageWidth / 2,
    200,
    { align: "center" }
  );
  doc.text(
    `has successfully adopted ${formData.petName}.`,
    pageWidth / 2,
    230,
    { align: "center" }
  );

  // Adoption date
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.text(
    `Adoption Date: ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    280,
    { align: "center" }
  );

  // Optional: small paw image/logo
  const pawImg = new Image();
  pawImg.src = ".\assets\logo.jpg"; // Place paw.png in public folder
  pawImg.onload = () => {
    doc.addImage(pawImg, "PNG", pageWidth / 2 - 25, 320, 50, 50);
    doc.save(`${formData.name}_Adoption_Certificate.pdf`);
  };

  // If no image, save immediately
  if (!pawImg.src) {
    doc.save(`${formData.name}_Adoption_Certificate.pdf`);
  }
};

  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed to load payment SDK. Check internet connection.");
      return;
    }

    try {
      // Create order from backend
      const order = await axios.post("http://localhost:3000/api/user/payment/create-order");

      const options = {
        key: "rzp_test_EivibYYx3Swhyx", // your test key
        amount: order.data.amount,
        currency: "INR",
        name: "Pet Adoption Center",
        description: `Adoption payment for ${formData.petName}`,
        order_id: order.data.id,
        handler: async (response) => {
          // Call backend to save adoption
          await axios.post("http://localhost:3000/api/user/petdonations/adoptpet", formData);
          // Show success popup
          setSuccessPopup(true);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f4ff",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: "18px",
          width: "90%",
          maxWidth: "450px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          💳 Razorpay Payment
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Adopting <strong>{formData.petName}</strong>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Amount: <strong>₹10</strong>
        </Typography>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ py: 1.5, borderRadius: "10px", fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Pay with Razorpay
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </Paper>

      {/* Success Dialog */}
      <Dialog open={successPopup} onClose={() => setSuccessPopup(false)}>
        <DialogTitle>✅ Payment Successful!</DialogTitle>
        <DialogContent>
          <Typography>
            You have successfully adopted <strong>{formData.petName}</strong>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setSuccessPopup(false); navigate("/adoption"); }}>OK</Button>
          <Button onClick={generateCertificate} variant="contained" color="primary">
            Download Certificate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
