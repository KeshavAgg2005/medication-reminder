const AuditLog = require('../models/AuditLog');

// Get all audit logs
exports.getLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find().sort({ createdAt: -1 }); // Sort logs by most recent
        res.json(logs);
    } catch (err) {
        console.error('Error fetching audit logs:', err);
        res.status(500).send('Server Error');
    }
};

// Add a new log entry (if needed)
exports.addLog = async (req, res) => {
    const { action, description } = req.body;
    try {
        const newLog = new AuditLog({ action, description });
        await newLog.save();
        res.json({ message: 'Log added successfully' });
    } catch (err) {
        console.error('Error adding log:', err);
        res.status(500).send('Server Error');
    }
};
