const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    // Add more patient-specific fields as required
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
