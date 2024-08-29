const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDFTimetable = (timetableData, outputPath) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(outputPath));

    doc.fontSize(16).text('Medication Timetable', { align: 'center' });
    doc.moveDown();

    timetableData.forEach(entry => {
        doc.fontSize(12).text(`Medication: ${entry.name}`);
        doc.text(`Dosage: ${entry.dosage}`);
        doc.text(`Frequency: ${entry.frequency}`);
        doc.text(`Days: ${entry.days.join(', ')}`);
        doc.text(`Times: ${entry.times.join(', ')}`);
        doc.moveDown();
    });

    doc.end();
};

module.exports = { generatePDFTimetable };
