#!/bin/bash

echo "Installing required Node.js dependencies..."

# Initialize npm if package.json does not exist
if [ ! -f "package.json" ]; then
    echo "Initializing npm project..."
    npm init -y
fi

# Install required dependencies (local)
echo "Installing Bcrypt, Body-Parser, CORS, Dotenv, Express, JSON Web Token, Multer, PostgreSQL, and Sequelize..."
npm install bcrypt body-parser cors dotenv express jsonwebtoken multer pg sequelize

# Install global dependencies
echo "Installing Nodemon globally..."
npm install -g nodemon

echo "All dependencies installed successfully!"
