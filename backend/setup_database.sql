-- Drop database if exists and create new one
DROP DATABASE IF EXISTS mobilemitra;
CREATE DATABASE mobilemitra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE mobilemitra;

-- Grant permissions
GRANT ALL PRIVILEGES ON mobilemitra.* TO 'root'@'localhost'; 