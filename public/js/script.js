document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the admin page
    if (document.getElementById('medicationForm')) {
        // Handle form submission for adding medication
        document.getElementById('medicationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const dosage = document.getElementById('dosage').value;
            const frequency = document.getElementById('frequency').value;
            const days = document.getElementById('days').value.split(',').map(day => day.trim());
            const times = document.getElementById('times').value.split(',').map(time => time.trim());

            fetch('/admin/addMedication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, dosage, frequency, days, times })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                document.getElementById('medicationForm').reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Check if we're on the patient page
    if (document.getElementById('medicationTable')) {
        // Load medications for patient
        fetch('/patient/medications')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('medicationTable');
            let html = '<table><thead><tr><th>Name</th><th>Dosage</th><th>Frequency</th><th>Days</th><th>Times</th></tr></thead><tbody>';
            data.forEach(medication => {
                html += `<tr>
                    <td>${medication.name}</td>
                    <td>${medication.dosage}</td>
                    <td>${medication.frequency}</td>
                    <td>${medication.days.join(', ')}</td>
                    <td>${medication.times.join(', ')}</td>
                </tr>`;
            });
            html += '</tbody></table>';
            table.innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
    }
});
