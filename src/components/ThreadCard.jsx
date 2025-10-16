import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function ThreadCard({ thread }) {
  const formattedDate = new Date(thread.date).toLocaleDateString();

  return (
    <Card
      style={{
        marginBottom: "15px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h6" style={{ color: "#6a0dad", fontWeight: 600 }}>
          {thread.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          By {thread.author} • {formattedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ThreadCard;
