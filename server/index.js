const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS to allow requests from frontend

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// GET request to fetch all available rides
app.get('/api/rides', (req, res) => {
  const sqlQuery = 'SELECT * FROM rides';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching rides:', err);
      res.status(500).json({ error: 'Failed to fetch rides' });
    } else {
      res.json(results);
    }
  });
});

// POST request for the driver to create a new ride
app.post('/api/rides', (req, res) => {
  const { driver_name, vehicle_info, origin, destination, available_seats } = req.body;

  // Validate the request body
  if (!driver_name || !vehicle_info || !origin || !destination || !available_seats) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sqlInsert = 'INSERT INTO rides (driver_name, vehicle_info, origin, destination, available_seats) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlInsert, [driver_name, vehicle_info, origin, destination, available_seats], (err, result) => {
    if (err) {
      console.error('Error inserting ride:', err);
      res.status(500).json({ error: 'Failed to create ride' });
    } else {
      res.status(201).json({ message: 'Ride created successfully', rideId: result.insertId });
    }
  });
});

// POST request for the rider to request a ride
app.post('/api/ride-requests', (req, res) => {
  const { rider_name, gender, pickup_location, destination_location, contact } = req.body;

  // Validate the request body
  if (!rider_name || !gender || !pickup_location || !destination_location || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sqlInsert = 'INSERT INTO ride_requests (rider_name, gender, pickup_location, destination_location, contact) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlInsert, [rider_name, gender, pickup_location, destination_location, contact], (err, result) => {
    if (err) {
      console.error('Error inserting ride request:', err);
      res.status(500).json({ error: 'Failed to submit ride request' });
    } else {
      res.status(201).json({ message: 'Ride request created successfully', requestId: result.insertId });
    }
  });
});


// GET request for the driver to view ride requests
app.get('/api/ride-requests', (req, res) => {
  const sqlQuery = `
    SELECT rider_name, gender, pickup_location, destination_location, contact 
    FROM ride_requests`;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching ride requests:', err);
      res.status(500).json({ error: 'Failed to fetch ride requests' });
    } else {
      res.json(results);
    }
  });
});


// POST request for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const sqlQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  db.query(sqlQuery, [email, password], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Failed to log in' });
    }

    if (results.length > 0) {
      // Successful login, return user data or token
      res.json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
