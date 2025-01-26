const { Student, User } = require('../models');

const studentController = {
  create: async (req, res) => {
    try {
      const { userId, name, enrollmentNumber, department, year } = req.body;

      const student = await Student.create({
        userId,
        name,
        enrollmentNumber,
        department,
        year,
      });

      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      const student = await Student.findOne({
        where: { userId },
        include: [{ model: User, attributes: ['username', 'email', 'role'] }],
      });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = studentController;