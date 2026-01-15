const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;
const SECRET_KEY = "mysecretkey"; // for JWT signing

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Fake "database" users
const users = [
  { username: "Taimur", password: "12345", role: "admin" },
  { username: "Patient1", password: "12345", role: "patient" },
  { username: "Doctor1", password: "12345", role: "doctor" },
];

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find user
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  // Create JWT token
  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Send response
  res.json({ token, role: user.role });
});

// Protected endpoint example
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Welcome ${decoded.username}! Role: ${decoded.role}` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
