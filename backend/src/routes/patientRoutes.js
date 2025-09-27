const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");

// 👇 Order matters: define /me BEFORE /:id
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const patient = await patientController.getPatientById({
      params: { id: req.user.id }
    }, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
router.post("/", patientController.createPatient);
router.put("/:id", patientController.updatePatient);

module.exports = router;
