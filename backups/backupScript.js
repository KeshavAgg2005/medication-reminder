const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load environment variables
const MONGO_URI = process.env.MONGO_URI;
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const TIMESTAMP = new Date().toISOString().replace(/[:.-]/g, '_');
const BACKUP_FILE = path.join(BACKUP_DIR, `backup_${TIMESTAMP}.gz`);

// Ensure the backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Create a backup using the `mongodump` command
const dumpCommand = `mongodump --uri="${MONGO_URI}" --archive="${BACKUP_FILE}" --gzip`;

exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing backup: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`Backup created at ${BACKUP_FILE}`);
});
