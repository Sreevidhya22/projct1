const Vaccination = require("../models/Vaccination");
const PDFDocument = require("pdfkit");

// 📌 Create a new booking
exports.createVaccination = async (req, res) => {
  try {
    const newVaccination = new Vaccination(req.body);
    await newVaccination.save();
    res.status(201).json({ message: "Vaccination booked successfully!", data: newVaccination });
  } catch (error) {
    res.status(500).json({ message: "Error creating vaccination", error: error.message });
  }
};

// 📌 Get all vaccinations
exports.getVaccinations = async (req, res) => {
  try {
    const allVaccinations = await Vaccination.find().sort({ _id: -1 });
    res.status(200).json(allVaccinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vaccinations", error: error.message });
  }
};

// 📄 Generate simple landscape certificate PDF
exports.downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const vacc = await Vaccination.findById(id);
    if (!vacc) return res.status(404).json({ message: "Vaccination not found" });
    if (vacc.status !== "Completed") return res.status(403).json({ message: "Certificate available only after completion" });

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });

    // Set headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${vacc.petName}_certificate.pdf`);
    doc.pipe(res);

    // ---- Certificate Title ----
    doc.font("Helvetica-Bold")
      .fontSize(32)
      .fillColor("#00509E")
      .text("OnePet Vaccination Certificate", { align: "center" });

    doc.moveDown(2);

    // ---- Body ----
    doc.font("Helvetica")
      .fontSize(18)
      .fillColor("black")
      .text(`This is to certify that the following pet has completed vaccination successfully:`, {
        align: "center",
      });

    doc.moveDown(2);

    doc.fontSize(20)
      .fillColor("#003366")
      .text(`Pet Name: ${vacc.petName}`, { align: "center" });
    doc.text(`Vaccine: ${vacc.vaccine}`, { align: "center" });
    doc.text(`Date: ${vacc.date}`, { align: "center" });
    doc.text(`Duration: ${vacc.duration}`, { align: "center" });

    doc.moveDown(3);

    // ---- Footer / Certification ----
    doc.fontSize(18)
      .fillColor("gray")
      .text("Certified By: OnePet Veterinary Clinic", { align: "center" });

    // ---- Signature ----
    doc.moveDown(2);
    doc.strokeColor("#00509E").lineWidth(1.5)
      .moveTo(doc.page.width / 2 - 120, doc.y)
      .lineTo(doc.page.width / 2 + 120, doc.y)
      .stroke();
    doc.fontSize(14).fillColor("black")
      .text("Authorized Signature", { align: "center" });

    doc.end();

  } catch (error) {
    console.error("Error generating PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating PDF", error: error.message });
    }
  }
};
