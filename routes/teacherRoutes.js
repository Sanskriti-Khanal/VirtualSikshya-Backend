const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const teacherController = require('../controller/teacherController');

const router = express.Router();

router.post('/', authMiddleware(['admin']), teacherController.create);
router.get('/:userId', authMiddleware(['admin', 'teacher']), teacherController.getProfile);



