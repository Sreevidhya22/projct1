const express = require("express");
const router = express.Router();
const {
  createVaccination,
  getVaccinations,
  downloadCertificate,
} = require("../controllers/vaccinationController");

router.post("/", createVaccination);
router.get("/", getVaccinations);
router.get("/certificate/:id", downloadCertificate);

module.exports = router;
