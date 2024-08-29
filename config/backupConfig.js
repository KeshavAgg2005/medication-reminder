const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

// Define backup directory and file name format
const backupDir = path.join(__dirname, '../backups');
const backupFileName = `backup_${new Date().toISOString().split('T')[0]}.gz`;
const backupFilePath = path.join(backupDir, backupFileName);

// Ensure the backup directory exists
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

// Backup function
const backupDatabase = () => {
    const mongoURI = process.env.MONGO_URI;
    const command = `mongodump --uri="${mongoURI}" --archive="${backupFilePath}" --gzip`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error('Error during backup:', err);
            return;
        }
        console.log('Backup completed successfully:', backupFilePath);
    });
};

// Export the backup function for use in other parts of the application
module.exports = backupDatabase;
