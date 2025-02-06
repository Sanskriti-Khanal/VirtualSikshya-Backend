const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const { User, createUser, findUserByEmail, findUserById } = require("../model/User");


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
    defaultValue: "guest",
  },
});

// User Functions
const createUser = async (name, email, hashedPassword, role, user_id) => {
  return await User.create({ name, email, password: hashedPassword, role, user_id });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const findUserById = async (id) => {
  return await User.findByPk(id);
};

// Export everything correctly
module.exports = { User, createUser, findUserByEmail, findUserById };
