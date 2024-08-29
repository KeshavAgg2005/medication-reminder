const User = require('../models/User');

// Middleware to check if the user has the required role
const checkRole = (requiredRole) => {
    return async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const user = await User.findById(req.user.id);

                if (user && user.role === requiredRole) {
                    return next(); // User has the required role, proceed to next middleware
                } else {
                    return res.status(403).json({ message: 'Access denied' }); // Forbidden
                }
            } catch (err) {
                return res.status(500).json({ message: 'Server error' });
            }
        } else {
            return res.redirect('/auth/login'); // Redirect to login if not authenticated
        }
    };
};

module.exports = {
    checkRole
};
