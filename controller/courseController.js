// const { Course, Teacher } = require('../model');

const Course = require('../model/Course')
const Teacher = require('../model/Teacher')
const courseController = {
  create: async (req, res) => {
    try {
      const { name, code, credits, teacherId } = req.body;

      const course = await Course.create({
        name,
        code,
        credits,
        teacherId,
      });

      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const courses = await Course.findAll({
        include: [{ model: Teacher, attributes: ['name', 'employeeId'] }],
      });

      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const course = await Course.findByPk(id, {
        include: [{ model: Teacher, attributes: ['name', 'employeeId'] }],
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = courseController;