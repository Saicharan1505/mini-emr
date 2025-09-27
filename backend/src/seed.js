const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const sequelize = require("./db");
const Patient = require("./models/patient");
const Appointment = require("./models/Appointment");
const Prescription = require("./models/Prescription");

async function seed() {
  try {
    // Reset tables
    await sequelize.sync({ force: true });

    // Load JSON file
    const dataPath = path.join(__dirname, "..", "data.json");
    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    for (const user of jsonData.users) {
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create patient
      const patient = await Patient.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });

      // Create appointments
      for (const appt of user.appointments) {
        await Appointment.create({
          provider: appt.provider,
          datetime: appt.datetime,
          repeat: appt.repeat,
          patientId: patient.id,
        });
      }

      // Create prescriptions
      for (const pres of user.prescriptions) {
        await Prescription.create({
          medication: pres.medication,
          dosage: pres.dosage,
          quantity: pres.quantity,
          refill_on: pres.refill_on,
          refill_schedule: pres.refill_schedule,
          patientId: patient.id,
        });
      }
    }

    console.log("Database seeded successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding DB:", err);
    process.exit(1);
  }
}

seed();
