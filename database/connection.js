require("dotenv").config();
const { Sequelize } = require("sequelize");




  const sequelize = new Sequelize("virtual_sikskya_db", "postgres", "admin123", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
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