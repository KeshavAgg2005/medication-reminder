function authenticateAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/auth/login');
}

function authenticatePatient(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'patient') {
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = {
    authenticateAdmin,
    authenticatePatient,
};
