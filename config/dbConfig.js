require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_URI, // Ensure this matches the variable name in your .env file
};
