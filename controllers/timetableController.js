const Medication = require('../models/Medication');
const pdfUtils = require('../utils/pdfUtils');

// Generate and download timetable as PDF
exports.generateTimetablePDF = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medications = await Medication.find({ patient: patientId }); // Fetch medications for the patient

        const pdf = pdfUtils.generateTimetablePDF(medications); // Utility function to create PDF
        res.setHeader('Content-Disposition', 'attachment; filename=timetable.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (err) {
        console.error('Error generating timetable PDF:', err);
        res.status(500).send('Server Error');
    }
};
