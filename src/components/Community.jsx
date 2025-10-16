import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreadCard from "./ThreadCard";
import NewThreadForm from "./NewThreadForm";

function Community() {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  // Fetch threads from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/user/threads")
      .then((res) => res.json())
      .then((data) => setThreads(data))
      .catch((err) => console.error("Error fetching threads:", err));
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#e6e6fa", // light lavender
        color: "#333",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#6a0dad" }}>
        Community Forum
      </h1>

      {/* Form to create new thread */}
      <NewThreadForm setThreads={setThreads} />

      {/* Display threads */}
      <div style={{ marginTop: "20px" }}>
        {threads.length > 0 ? (
         threads.map((thread, index) => (
  <ThreadCard key={thread._id || index} thread={thread} />
))

        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>No threads yet.</p>
        )}
      </div>

      {/* Back Button at the bottom */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/Home")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default Community;
