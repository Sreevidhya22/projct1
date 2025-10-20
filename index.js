const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rootRouter = require("./routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Mount all routes
app.use("/api", rootRouter);

app.get("/", (req, res) => res.send("🐾 OnePet Backend Running!"));
//mongodb+srv://sreevidhyavenugopal89_db_user:Bzc1SYEv8wB6GUK@cluster0.1zapxuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://sreevidhyavenugopal89_db_user:Bzc1SYEv8wB6GUKF@cluster0.1zapxuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
