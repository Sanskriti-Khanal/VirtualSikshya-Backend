const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer Configuration (For Image Uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images to the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// User Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

//Route for Profile Image Upload
router.put("/:id/profile", authenticateUser, upload.single("profileImage"), userController.updateProfileImage);

module.exports = router;
