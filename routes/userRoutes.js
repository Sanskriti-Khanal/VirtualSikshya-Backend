const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserProfile, getAllUsers } = require("../controllers/userController"); 

const router = express.Router();


router.get("/", getAllUsers);

 

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
