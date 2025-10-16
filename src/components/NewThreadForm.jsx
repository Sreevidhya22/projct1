import React, { useState } from "react";

function NewThreadForm({ setThreads }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:3000/api/user/threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  });

  if (res.ok) {
    // Fetch updated list directly from DB
    const updated = await fetch("http://localhost:3000/api/user/threads").then((r) => r.json());
    setThreads(updated);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", width: "60%", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ padding: "8px", width: "20%", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        Post
      </button>
    </form>
  );
}

export default NewThreadForm;
