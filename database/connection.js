require("dotenv").config();
const { Sequelize } = require("sequelize");



const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name
  process.env.DB_USER,  // Database username
  process.env.DB_PASS,  // Database password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // Set to true if you want SQL logs in the console
  }
);
  
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