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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
