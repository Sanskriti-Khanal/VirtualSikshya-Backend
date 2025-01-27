const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher']), courseController.create);
router.get('/', authMiddleware(['admin', 'student', 'teacher']), courseController.getAll);
router.get('/:id', authMiddleware(['admin', 'student', 'teacher']), courseController.getById);

module.exports = router;