import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import vettImg from "../assets/vett.jpg";

function Vetconsult() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Vet Consultation",
      desc: "Talk to certified veterinarians for expert pet care.",
      img: vettImg,
      btn: "Book Appointment",
    },
  ];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "30px", color: "#1976d2" }}>Pet Healthcare Services</h1>
        
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {services.map((service, i) => (
          <div
            key={i}
            style={{
              width: "300px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={service.img}
              alt={service.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/vetconsult")}
                style={{ marginBottom: "15px" }}
              >
                {service.btn}
              </Button>

              {/* Back to Home Button below */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/Home")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vetconsult;
