const Patient = require("../models/patient");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Get all patients (basic info)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: ["id", "name", "email"],
      include: [
        { model: Appointment, attributes: ["id", "provider", "datetime"] },
        { model: Prescription, attributes: ["id", "medication", "dosage"] },
      ],
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single patient with full details
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [Appointment, Prescription],
    });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update patient info
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    await patient.update(req.body);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
