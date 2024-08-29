const passport = require('passport');

// Handle login for users
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info.message);
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return next(err);
            }
            console.log(`User ${user.username} logged in with role: ${user.role}`);
            if (user.role === 'ServerAdmin') {
                console.log('Redirecting to ServerAdmin dashboard');
                return res.redirect('/serveradmin/dashboard');
            }
            if (user.role === 'Admin') {
                console.log('Redirecting to Admin dashboard');
                return res.redirect('/admin/dashboard');
            }
            console.log('Redirecting to Patient dashboard');
            return res.redirect('/patient/dashboard');
        });
    })(req, res, next);
};






// Handle logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/auth/login');
};



