const Patient = require('../models/Patient');
const Medication = require('../models/Medication');
const User = require('../models/User');

// Render the admin dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Fetch data for the dashboard (e.g., total number of patients, medications)
        const totalPatients = await Patient.countDocuments();
        const totalMedications = await Medication.countDocuments();

        res.json({
            totalPatients,
            totalMedications,
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).send('Server Error');
    }
};

// Add a new patient
exports.addPatient = async (req, res) => {
    const { name, hospitalId, email, phoneNumber } = req.body;

    try {
        const newPatient = new Patient({ name, hospitalId, email, phoneNumber });
        await newPatient.save();
        res.json({ message: 'Patient added successfully' });
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).send('Server Error');
    }
};

// Add a new medication
exports.addMedication = async (req, res) => {
    const { name, dosage, frequency, days, times } = req.body;

    try {
        const newMedication = new Medication({ name, dosage, frequency, days, times });
        await newMedication.save();
        res.json({ message: 'Medication added successfully' });
    } catch (err) {
        console.error('Error adding medication:', err);
        res.status(500).send('Server Error');
    }
};

// Example method to get all patients (for demonstration purposes)
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).send('Server Error');
    }
};

// Example method to get all medications (for demonstration purposes)
exports.getAllMedications = async (req, res) => {
    try {
        const medications = await Medication.find();
        res.json(medications);
    } catch (err) {
        console.error('Error fetching medications:', err);
        res.status(500).send('Server Error');
    }
};
