// Initialization
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sequelize = require("./database/db"); // Import Sequelize connection

const userRoute = require("./routes/userRoute");

// Load environment variables
dotenv.config();

// Creating a Server
const app = express();

// Creating a Port
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to get current Date & Time
const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS AM/PM
};

// Test Route - Shows Current Date & Time
app.get("/", (req, res) => {
    res.send(`Current Date & Time: ${getCurrentDateTime()}`);
});

// Serve Uploaded Images as Static Files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/users", userRoute);

// Sync Database and Start Server
sequelize.sync()
    .then(() => {
        console.log("Database synchronized successfully...............");
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}......................`);
        });
    })
    .catch((error) => {
        console.error("Database synchronization failed:", error);
    });
