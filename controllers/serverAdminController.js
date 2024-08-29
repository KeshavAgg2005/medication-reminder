const User = require('../models/User');
const path = require('path');
const bcrypt = require('bcrypt');

// Get ServerAdmin dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Serve the dashboard page
        res.sendFile(path.join(__dirname, '../public/serverAdminDashboard.html'));
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).send('Server Error');
    }
};

// Get list of Admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' });
        res.json(admins);
    } catch (err) {
        console.error('Error fetching admins:', err);
        res.status(500).send('Server Error');
    }
};

// Add Admin
exports.addAdmin = async (req, res) => {
    try {
        const { username, password, name, email } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            username,
            password: hashedPassword, // Store hashed password
            role: 'Admin',
            name,
            email
        });

        await newAdmin.save();
        res.json({ message: 'Admin added successfully' });
    } catch (err) {
        console.error('Error adding Admin:', err);
        res.status(500).send('Server Error');
    }
};

// Remove Admin
exports.removeAdmin = async (req, res) => {
    try {
        const { username } = req.body;

        // Ensure you are not removing the ServerAdmin
        const result = await User.deleteOne({ username, role: 'Admin' });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin removed successfully' });
    } catch (err) {
        console.error('Error removing Admin:', err);
        res.status(500).send('Server Error');
    }
};
