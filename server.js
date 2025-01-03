const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [];

// Validation functions
const isValidEmail = (email) => /^[\w-\.]+@[\w-]+\.[a-z]{2,7}$/i.test(email);
const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
const isValidDob = (dob) => {
    const date = new Date(dob);
    return !isNaN(date) && date <= new Date();
};

app.post('/signup', (req, res) => {
    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (users.map((user) => user.email).includes(email)) {
        return res.status(400).json({ error: "Email already registered." });
    }

    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ error: "Username must be 3-20 characters." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ error: "Password must be 8+ characters with uppercase, lowercase, number, and special character." });
    }

    if (!isValidDob(dob)) {
        return res.status(400).json({ error: "Invalid or future date of birth." });
    }

    users.push({ username, email, password, dob });
    res.status(201).json({ message: "Signup successful!" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
