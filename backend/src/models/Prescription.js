const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Patient = require("./patient");

const Prescription = sequelize.define("Prescription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  refill_on: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  refill_schedule: {
    type: DataTypes.STRING, // monthly, weekly, etc.
    allowNull: false,
  },
});

// Relationship: Prescription belongs to Patient
Prescription.belongsTo(Patient, { foreignKey: "patientId" });
Patient.hasMany(Prescription, { foreignKey: "patientId" });

module.exports = Prescription;
