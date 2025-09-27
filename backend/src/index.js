const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = require("./db");
const Patient = require("./models/patient");
const Appointment = require("./models/Appointment");
const Prescription = require("./models/Prescription");

const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const authRoutes = require("./routes/authRoutes");  

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/auth", authRoutes); 

// Sync DB
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced ✅");
});


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Import routes later (patients, appointments, prescriptions)
// app.use("/patients", require("./routes/patientRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
