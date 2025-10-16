const Thread = require("../models/Thread");

// Get all threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().sort({ date: -1 });
    res.status(200).json(threads);
  } catch (err) {
    console.error("❌ Error fetching threads:", err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new thread
exports.createThread = async (req, res) => {
  const { title, author } = req.body;
  console.log("📩 Incoming thread:", req.body);

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newThread = new Thread({
    title,
    author,
    comments: 0,
  });

  try {
    const savedThread = await newThread.save();
    console.log("✅ Thread saved:", savedThread);
    res.status(201).json(savedThread);
  } catch (err) {
    console.error("❌ Error saving thread:", err);
    res.status(500).json({ message: err.message });
  }
};
