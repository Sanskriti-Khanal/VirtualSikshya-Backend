const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "student", "teacher", "guest"),
    allowNull: false,
  },
});

module.exports = User;
