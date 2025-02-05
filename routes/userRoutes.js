const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// **Register Route**
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

// **Login Route**
router.post("/login", loginUser);

// **Get User Profile (Protected)**
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
