const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const studentController = require('../controller/studentController');

const router = express.Router();

router.post('/', authMiddleware(['admin']), studentController.create);
router.get('/:userId', authMiddleware(['admin', 'student']), studentController.getProfile);

module.exports = router;