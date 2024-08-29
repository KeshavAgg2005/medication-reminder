document.addEventListener('DOMContentLoaded', () => {
    const addAdminForm = document.getElementById('addAdminForm');
    const removeAdminForm = document.getElementById('removeAdminForm');
    const adminList = document.getElementById('adminList');

    // Fetch the current list of admins
    fetch('/serveradmin/getAdmins')
        .then(response => response.json())
        .then(admins => {
            adminList.innerHTML = admins.map(admin => `
                <p>${admin.username} - ${admin.email} 
                <button data-username="${admin.username}" class="remove-admin">Remove</button></p>
            `).join('');
        })
        .catch(err => console.error('Error fetching admins:', err));

    // Handle form submission for adding an admin
    addAdminForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(addAdminForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            name: formData.get('name'),
            email: formData.get('email')
        };

        fetch('/serveradmin/addAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            addAdminForm.reset();
            // Refresh the list of admins
            return fetch('/serveradmin/getAdmins');
        })
        .then(response => response.json())
        .then(admins => {
            adminList.innerHTML = admins.map(admin => `
                <p>${admin.username} - ${admin.email} 
                <button data-username="${admin.username}" class="remove-admin">Remove</button></p>
            `).join('');
        })
        .catch(err => console.error('Error adding admin:', err));
    });

    // Handle form submission for removing an admin
    removeAdminForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('removeUsername').value;

        fetch('/serveradmin/removeAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            removeAdminForm.reset();
            // Refresh the list of admins
            return fetch('/serveradmin/getAdmins');
        })
        .then(response => response.json())
        .then(admins => {
            adminList.innerHTML = admins.map(admin => `
                <p>${admin.username} - ${admin.email} 
                <button data-username="${admin.username}" class="remove-admin">Remove</button></p>
            `).join('');
        })
        .catch(err => console.error('Error removing admin:', err));
    });

    // Handle click events for removing admins
    adminList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-admin')) {
            const username = event.target.dataset.username;

            fetch('/serveradmin/removeAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                // Refresh the list of admins
                return fetch('/serveradmin/getAdmins');
            })
            .then(response => response.json())
            .then(admins => {
                adminList.innerHTML = admins.map(admin => `
                    <p>${admin.username} - ${admin.email} 
                    <button data-username="${admin.username}" class="remove-admin">Remove</button></p>
                `).join('');
            })
            .catch(err => console.error('Error removing admin:', err));
        }
    });
});
