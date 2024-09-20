CREATE TABLE ride_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rider_name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    pickup_location VARCHAR(255) NOT NULL,
    destination_location VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
