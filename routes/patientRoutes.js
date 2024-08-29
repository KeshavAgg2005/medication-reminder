const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticatePatient } = require('../middlewares/authMiddleware');

// Patient dashboard route
router.get('/dashboard', authenticatePatient, patientController.getDashboard);

// Get timetable route
router.get('/timetable', authenticatePatient, patientController.getTimetable);

// Download timetable route
router.get('/downloadTimetable', authenticatePatient, patientController.downloadTimetable);

module.exports = router;
