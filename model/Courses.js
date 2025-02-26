const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // Import Sequelize instance

const Courses = sequelize.define("User", {
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("student", "teacher", "exam"),
        allowNull: false,
        defaultValue: "student", // Default role
    },
    
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.STRING, // Store image URL
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, // Stores only YYYY-MM-DD
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Active by default
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Email verification status
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Account status (true = active, false = deactivated)
    }
}, {
    timestamps: true, // Adds createdAt & updatedAt automatically
    tableName: "users"
});

module.exports = User;
