const express = require('express');
const serverAdminController = require('../controllers/serverAdminController'); // Make sure this path is correct
const router = express.Router();

// ServerAdmin dashboard route
router.get('/dashboard', serverAdminController.getDashboard);

// Add Admin route
router.post('/addAdmin', serverAdminController.addAdmin);

// Remove Admin route
router.post('/removeAdmin', serverAdminController.removeAdmin);

// Get all admins
router.get('/getAdmins', serverAdminController.getAdmins);

module.exports = router;
