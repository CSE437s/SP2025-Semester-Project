const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config");
const router = express.Router();

// Middleware to authenticate tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
};

// Register Route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const [existingUser] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        console.log("Database user query result:", user);

        if (user.length === 0) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid credentials.");
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Generated JWT:", token);

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


// Dashboard Route (protected)
router.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the dashboard page!", user: req.user });
});

module.exports = router;
