const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// User Registration (No profile image during registration)
const registerUser = async (req, res) => {
    try {
        const { student_id, name, email, password, role, phone, address, gender, dateOfBirth } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use!" });
        }

        // Check if student_id is unique (only if provided)
        if (student_id) {
            const existingStudent = await User.findOne({ where: { student_id } });
            if (existingStudent) {
                return res.status(400).json({ error: "Student ID already in use!" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (profileImage is not included at first)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            student_id: student_id || null,
            role: role || "student",
            phone,
            address,
            gender,
            dateOfBirth,
            profileImage: null // No profile image during registration
        });

        res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            role: user.role, // Send role to frontend
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Information (Including Profile Image Upload Later)
const updateUser = async (req, res) => {
    try {
        const { name, phone, address, gender, dateOfBirth, isActive } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.gender = gender || user.gender;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.isActive = isActive !== undefined ? isActive : user.isActive;

        await user.save();
        res.status(200).json({ message: "User updated successfully!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Profile Image
const updateProfileImage = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded!" });
        }

        user.profileImage = req.file.path; // Save the file path
        await user.save();

        res.status(200).json({ message: "Profile image updated successfully!", profileImage: user.profileImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export all controllers
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    updateProfileImage,
    deleteUser
};
