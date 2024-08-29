const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/application.log');

// Create a write stream for the log file
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const log = (message) => {
    const timestamp = new Date().toISOString();
    logStream.write(`[${timestamp}] ${message}\n`);
};

module.exports = { log };
