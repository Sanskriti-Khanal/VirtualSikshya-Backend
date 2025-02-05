const { Sequelize } = require('sequelize');
require("dotenv").config();

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // PostgreSQL
  logging: false, // Set to true to log SQL queries
});
// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('DB Connection Successful........................');
  } catch (error) {
    console.error('Unable to connect to the database.....', error);
  }
}

// Call the connection test function
testConnection();

// Export the Sequelize instance for use in models
module.exports = sequelize;