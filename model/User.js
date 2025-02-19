const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection"); // ✅ Ensure correct DB connection

// Define User Model
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

// ✅ Properly export User model and helper functions
module.exports ={User} ;
module.exports.createUser = async (name, email, hashedPassword, role, user_id) => {
  return await User.create({ name, email, password: hashedPassword, role, user_id });
};
module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } ,
    attributes: ["user_id", "name", "email", "password", "role"] 
  });

};
module.exports.findUserById = async (id) => {
  return await User.findByPk(id);
};
