const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medications: [{
        type: Schema.Types.ObjectId,
        ref: 'Medication'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
