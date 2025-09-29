
const { Op } = require("sequelize");
const Appointment = require("../models/Appointment");
const Patient = require("../models/patient");


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: Patient });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single appointment
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, { include: Patient });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    await appointment.destroy();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get upcoming appointments (next 3 months) for a patient
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const today = new Date();
    const threeMonths = new Date();
    threeMonths.setMonth(today.getMonth() + 3);

    const appointments = await Appointment.findAll({
      where: {
        patientId,
        datetime: {
          [Op.between]: [today, threeMonths],
        },
      },
      order: [["datetime", "ASC"]],
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
