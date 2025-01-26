const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('university_management', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // Disable logging for cleaner output
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('DB Connection Successful...........');
  } catch (error) {
    console.error('Unable to connect to the database.....', error);
  }
}

// Call the connection test function
testConnection();

// Export the Sequelize instance for use in models
module.exports = sequelize;