const express = require("express");
const rootRouter = express.Router();

// Routes
const userRoutes = require("./user/userRoutes");
const vetRoutes = require("./vet/vetRoutes");
const petDonationRoutes = require("./user/petDonationRoutes");
const appointmentRoutes = require("./user/appointRoutes");
const adminRoutes = require("./admin/adminroutes");

rootRouter.use("/admin", adminRoutes);
// User routes
rootRouter.use("/user", userRoutes);

// Vet routes
rootRouter.use("/vet", vetRoutes);

// Pet donation routes
rootRouter.use("/user/petdonations", petDonationRoutes);

// Appointment routes
rootRouter.use("/user/appointments", appointmentRoutes);
rootRouter.use("/vet/appointments", appointmentRoutes);
const threadRoutes = require("./threadRoutes");

// Threads routes
rootRouter.use("/user/threads", threadRoutes);




module.exports = rootRouter;
