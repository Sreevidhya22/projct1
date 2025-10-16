const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");

// GET all threads
router.get("/", threadController.getThreads);

// POST new thread
router.post("/", threadController.createThread);

module.exports = router;
