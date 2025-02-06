const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User, createUser, findUserByEmail, findUserById } = require("../model/User");

// **Register a New User**
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Default role is guest unless prefix exists
    let role = "guest";
    const userCount = await User.count();
    const nextUserNumber = userCount ? userCount + 1 : 1;

    // ✅ Declare `user_id` before using it
    let user_id = `guest${nextUserNumber.toString().padStart(4, "0")}`;

    if (email.startsWith("st")) {
      user_id = `st${nextUserNumber.toString().padStart(4, "0")}`;
      role = "student";
    } else if (email.startsWith("ta")) {
      user_id = `ta${nextUserNumber.toString().padStart(4, "0")}`;
      role = "teacher";
    } else if (email.startsWith("ad")) {
      user_id = `ad0001`; // Only one admin
      role = "admin";
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser(name, email, hashedPassword, role, user_id);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// **User Login**
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, role: user.role, user_id: user.user_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// **Get User Profile**
exports.getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// **Get All Users**
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["user_id", "name", "email", "role"] }); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
