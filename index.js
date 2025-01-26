const express = require('express');
const sequelize = require('./database/virtual_sikshya_db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/courses', courseRoutes);

// Sync Sequelize models with the database
sequelize
  .sync({ force: false }) // Set `force: true` to drop and recreate tables
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});