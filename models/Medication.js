const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    days: [String],
    times: [String],
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);
