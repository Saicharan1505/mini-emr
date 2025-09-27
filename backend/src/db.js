const { Sequelize } = require("sequelize");
require("dotenv").config();  // 👈 load .env here

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 5432,   // default PostgreSQL port
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
