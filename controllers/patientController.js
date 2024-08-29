const Patient = require('../models/Patient');
const Medication = require('../models/Medication');
const pdfUtils = require('../utils/pdfUtils');

// Render the patient dashboard
exports.getDashboard = async (req, res) => {
    try {
        const patientId = req.user._id; // Assuming patient info is stored in the session
        const patient = await Patient.findById(patientId);
        const medications = await Medication.find(); // Fetch relevant medications if needed

        res.json({
            patient,
            medications
        });
    } catch (err) {
        console.error('Error fetching patient dashboard:', err);
        res.status(500).send('Server Error');
    }
};

// Get medication timetable for the patient
exports.getTimetable = async (req, res) => {
    try {
        const patientId = req.user._id;
        const medications = await Medication.find(); // Fetch patient's medication details

        res.json(medications);
    } catch (err) {
        console.error('Error fetching medication timetable:', err);
        res.status(500).send('Server Error');
    }
};

// Download medication timetable as PDF
exports.downloadTimetable = async (req, res) => {
    try {
        const patientId = req.user._id;
        const medications = await Medication.find(); // Fetch patient's medication details

        const pdf = pdfUtils.generateTimetablePDF(medications); // Utility function to create PDF
        res.setHeader('Content-Disposition', 'attachment; filename=medication-timetable.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (err) {
        console.error('Error generating PDF timetable:', err);
        res.status(500).send('Server Error');
    }
};
