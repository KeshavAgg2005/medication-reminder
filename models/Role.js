const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String], // Array of permissions (e.g., ['create', 'read', 'update', 'delete'])
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
