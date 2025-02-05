const express = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected Routes with Auth Middleware
router.get('/show_user_by_id/:id', authMiddleware(['ADMIN', 'TEACHER', 'STUDENT']), userController.getProfile);
router.get('/show_users', authMiddleware(['ADMIN', 'TEACHER']), userController.showUsers);

// Dashboard Routes (Role-based Access)
router.get('/dashboard', authMiddleware(['ADMIN', 'TEACHER', 'STUDENT']), userController.dashboard); // All roles can access a dashboard

module.exports = router;
