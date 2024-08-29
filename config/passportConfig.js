const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Configure Passport.js to use local strategy for authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find user by username
            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'No user found with that username' });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // Successful authentication
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
