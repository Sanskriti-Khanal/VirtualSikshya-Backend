//const { Teacher, User } = require('../model');
const Teacher = require('../model/Teacher')
const User = require('../model/User')

const teacherController = {
  create: async (req, res, next) => {
    try {
      const { userId, name, employeeId, department, designation } = req.body;

      const teacher = await Teacher.create({
        userId,
        name,
        employeeId,
        department,
        designation,
      });

      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res,next) => {
    try {
      const { userId } = req.params;

      const teacher = await Teacher.findOne({
        where: { userId },
        include: [{ model: User, attributes: ['username', 'email', 'role'] }],
      });

      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = teacherController;