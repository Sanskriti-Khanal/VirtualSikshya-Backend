const sequelize = require("./database/db"); // Import Sequelize instance
const dotenv = require("dotenv");

dotenv.config();

const deleteTable = async (tableName) => {
    try {
        await sequelize.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE;`);
        console.log(`Table '${tableName}' deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting table '${tableName}':`, error.message);
    } finally {
        await sequelize.close(); // Close DB connection
    }
};

// Run the script only if a table name is provided
const tableName = process.argv[2]; // Get table name from command-line argument

if (!tableName) {
    console.error("Please provide a table name. Example: node deleteTable.js users");
    process.exit(1);
}

deleteTable(tableName);
