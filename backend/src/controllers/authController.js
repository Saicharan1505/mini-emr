const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

// Login endpoint
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find patient by email
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: patient.id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
