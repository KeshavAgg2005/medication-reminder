const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const connectFlash = require('connect-flash');
const dbConfig = require('./config/dbConfig');
const passportConfig = require('./config/passportConfig');
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController');
const patientController = require('./controllers/patientController');
const timetableController = require('./controllers/timetableController');
const auditController = require('./controllers/auditController');
const serverAdminRoutes = require('./routes/serverAdminRoutes'); // Add this line
const serverAdminController = require('./controllers/serverAdminController');

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'ca439ddba7397ff5f8ce39fb4d1d4565832bf7fcad843947c29049da343bb874421779942aa12e794404586e82b4add57937d9273fd922c6d8f06ea279c9afab',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Authentication routes
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/authLogin.html'));
});

app.post('/auth/login', authController.login);

app.get('/auth/logout', authController.logout);

// Admin routes
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/adminLogin.html'));
});

app.post('/admin/login', authController.login);

app.get('/admin/dashboard', adminController.getDashboard);
app.post('/admin/addPatient', adminController.addPatient);
app.post('/admin/addMedication', adminController.addMedication);

// Patient routes
app.get('/patient/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/patientLogin.html'));
});

app.post('/patient/login', authController.login);

app.get('/patient/dashboard', patientController.getDashboard);
app.get('/patient/timetable', patientController.getTimetable);
app.get('/patient/downloadTimetable', patientController.downloadTimetable);

// Timetable routes
app.get('/timetable/:patientId', timetableController.generateTimetablePDF);

// Audit routes
app.get('/audit/logs', auditController.getLogs);

// ServerAdmin routes
app.use('/serveradmin', serverAdminRoutes); // Add this line

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// ServerAdmin routes
app.get('/serveradmin/dashboard', serverAdminController.getDashboard);

// ServerAdmin routes
app.get('/serveradmin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/serverAdminLogin.html'));
});

app.post('/serveradmin/login', authController.login);

app.get('/serveradmin/dashboard', (req, res) => {
    // Ensure that req.user.role is 'ServerAdmin'
    if (req.user && req.user.role === 'ServerAdmin') {
        res.sendFile(path.join(__dirname, 'public/serverAdminDashboard.html'));
    } else {
        res.redirect('/serveradmin/login');
    }
});
