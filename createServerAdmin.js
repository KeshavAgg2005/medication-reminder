const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as necessary
const dbConfig = require('./config/dbConfig');

mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Database connected');

    // Check if ServerAdmin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
        console.log('ServerAdmin already exists');
        return mongoose.disconnect();
    }

    // Create a new ServerAdmin user
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Change the password as needed
    const newAdmin = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'ServerAdmin',
        name: 'Admin User',
        email: 'admin@example.com'
    });

    await newAdmin.save();
    console.log('ServerAdmin user created successfully');
    mongoose.disconnect();
})
.catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
});
