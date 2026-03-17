const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payload
app.use(express.json());

// 1. Logging Middleware: Logs the request method and URL path
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route handler
});

// 2. Authentication Middleware: Checks for a simple Authorization header
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Return 401 Unauthorized if the header is completely missing
    return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
  }
  next(); // Header is present, allow request to proceed
});

// In-memory array to act as our "database"
let users = [];
// Variable to keep track of auto-incrementing user IDs
let nextId = 1;

// Helper function to validate email formats using a common regular expression
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// GET /users -> Retrieve all users
app.get('/users', (req, res) => {
  // Returns HTTP 200 (Success) with the existing list of users
  res.status(200).json(users);
});

// GET /users/:id -> Retrieve a single user by their ID
app.get('/users/:id', (req, res) => {
  // Extract user ID from route parameters explicitly as an integer
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);

  if (!user) {
    // Return HTTP 404 (Not Found) if we couldn't match the ID
    return res.status(404).json({ error: 'User not found' });
  }

  // Returns HTTP 200 (Success) with the isolated user object
  res.status(200).json(user);
});

// POST /users -> Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validation step: Check if both name and email exist
  if (!name || !email) {
    // Return HTTP 400 (Bad Request)
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  // Validation step: Check if the provided email actually looks like an email
  if (!isValidEmail(email)) {
    // Return HTTP 400 (Bad Request)
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Construct a brand-new user object
  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);
  // Return HTTP 201 (Created) and print out the new user specifics
  res.status(201).json(newUser);
});

// PUT /users/:id -> Update an existing user entirely
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  // Identify index of target user
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    // Return HTTP 404 (Not Found)
    return res.status(404).json({ error: 'User not found' });
  }

  // Validation step: Check if new entries maintain both required fields
  if (!name || !email) {
    // Return HTTP 400 (Bad Request)
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  // Validation step: Check the provided email updates format requirements
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Replace user reference with modified entity
  users[userIndex] = { id, name, email };
  // Return HTTP 200 (Success)
  res.status(200).json(users[userIndex]);
});

// DELETE /users/:id -> Delete a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    // Return HTTP 404 (Not Found) if no ID matching the input can be found
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove precisely 1 entry from the specific index position
  users.splice(userIndex, 1);
  // Return HTTP 200 (Success) with standard JSON messaging
  res.status(200).json({ message: 'User deleted successfully' });
});

// Execute the Express server mapping initialization
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
