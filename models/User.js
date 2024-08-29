const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ServerAdmin', 'Admin', 'Patient'],
        required: true
    },
    // Additional fields for user profile
    name: {
        type: String
    },
    email: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
