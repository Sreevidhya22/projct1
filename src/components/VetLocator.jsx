import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "20px",
};

const VetLocator = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 Replace with your key
  });

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Dummy vet data (can come from backend later)
  useEffect(() => {
    setVets([
      {
        id: 1,
        name: "Happy Paws Veterinary Clinic",
        lat: 10.015,
        lng: 76.341,
        address: "MG Road, Kochi",
        phone: "+91 98765 43210",
      },
      {
        id: 2,
        name: "PetCare Hospital",
        lat: 10.012,
        lng: 76.347,
        address: "Panampilly Nagar, Kochi",
        phone: "+91 99887 66554",
      },
    ]);
  }, []);

  if (!isLoaded || !currentLocation)
    return <p style={{ textAlign: "center" }}>Loading map...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#7a3e9d" }}>🐾 Vet Locator</h2>
      <p style={{ textAlign: "center", marginBottom: "15px" }}>
        Find nearby veterinary clinics and hospitals for your pets.
      </p>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
      >
        {/* User's current location */}
        <Marker position={currentLocation} label="You" />

        {/* Vet markers */}
        {vets.map((vet) => (
          <Marker
            key={vet.id}
            position={{ lat: vet.lat, lng: vet.lng }}
            onClick={() => setSelectedVet(vet)}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
            }}
          />
        ))}

        {/* Info window for selected vet */}
        {selectedVet && (
          <InfoWindow
            position={{ lat: selectedVet.lat, lng: selectedVet.lng }}
            onCloseClick={() => setSelectedVet(null)}
          >
            <div style={{ textAlign: "center" }}>
              <h3>{selectedVet.name}</h3>
              <p>{selectedVet.address}</p>
              <p>📞 {selectedVet.phone}</p>
              <Button
                variant="contained"
                style={{ backgroundColor: "#b26ff1" }}
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${selectedVet.lat},${selectedVet.lng}`,
                    "_blank"
                  )
                }
              >
                Get Directions
              </Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default VetLocator;
