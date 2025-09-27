const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Patient = require("./patient");

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  repeat: {
    type: DataTypes.STRING, // weekly, monthly, etc.
    allowNull: true,
  },
});

// Relationship: Appointment belongs to Patient
Appointment.belongsTo(Patient, { foreignKey: "patientId" });
Patient.hasMany(Appointment, { foreignKey: "patientId" });

module.exports = Appointment;
