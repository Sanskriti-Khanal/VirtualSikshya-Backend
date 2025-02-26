const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.PG_DATABASE,   
    process.env.PG_USER,       
    process.env.PG_PASSWORD,   
    {
        host: process.env.PG_HOST, 
        dialect: "postgres",       
        port: process.env.PG_PORT || 5432, 
        logging: false,
    }
);

// Function to test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Connected Successfully...");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
};

// Sync models (Optional: Use { force: true } in development to drop & recreate tables)
const syncDB = async () => {
    try {
        await sequelize.sync(); 
        console.log("Database Synchronized............................");
    } catch (error) {
        console.error("Database Synchronization Failed:", error.message);
    }
};

// Run DB connection & sync
connectDB();
syncDB();

module.exports = sequelize;
