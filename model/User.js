const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // Import your Sequelize instance

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // name of Target model (the table name, typically lowercase and pluralized)
      key: "id",
    },
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  tableName: "courses", // Explicit table name in your database
});

module.exports = Course;
