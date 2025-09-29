const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");

router.get("/", prescriptionController.getAllPrescriptions);
router.get("/:id", prescriptionController.getPrescriptionById);
router.get("/upcoming/:patientId", prescriptionController.getUpcomingPrescriptions);
router.post("/", prescriptionController.createPrescription);
router.put("/:id", prescriptionController.updatePrescription);
router.delete("/:id", prescriptionController.deletePrescription);

module.exports = router;
