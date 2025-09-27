const Prescription = require("../models/Prescription");
const Patient = require("../models/patient");

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({ include: Patient });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single prescription
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id, { include: Patient });
    if (!prescription) return res.status(404).json({ error: "Prescription not found" });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new prescription
exports.createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update prescription
exports.updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) return res.status(404).json({ error: "Prescription not found" });

    await prescription.update(req.body);
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete prescription
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) return res.status(404).json({ error: "Prescription not found" });

    await prescription.destroy();
    res.json({ message: "Prescription deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
