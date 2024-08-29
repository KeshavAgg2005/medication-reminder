const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getDashboard);
router.post('/addPatient', adminController.addPatient);
router.post('/addMedication', adminController.addMedication);

module.exports = router;
