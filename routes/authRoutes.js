const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

// Login route for both admin and patient
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/authLogin.html'));
});

router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
