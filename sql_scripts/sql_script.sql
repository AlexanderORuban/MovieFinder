-- Create a new database called "recommendations"
CREATE DATABASE recommendations;

-- Use the "recommendations" database
USE recommendations;

-- Drop the "movies" table if it already exists (to avoid errors when re-running the script)
DROP TABLE IF EXISTS movies;

-- Create the "movies" table with the specified columns
CREATE TABLE movies(
    -- The unique identifier for each movie recommendation
	id INT AUTO_INCREMENT,

    -- The name of the person recommending the movie
	name VARCHAR(255),

    -- The name of the movie being recommended
    movie VARCHAR(255),

    -- The genre of the movie
    genre VARCHAR(255),

    -- The rating of the movie, stored as an integer (1-10)
    rating INT,

    -- Reason why the user is recommending the movie
    why TEXT,

    -- Timestamp when the recommendation was added (defaults to the current time)
    timestamp DATETIME DEFAULT NOW(),
    
    -- Define the "id" as the primary key for the table
    PRIMARY KEY (id)
);

-- Insert a sample movie recommendation into the "movies" table
INSERT INTO movies (name, movie, genre, rating, why) 
VALUES ('Felix', 'Lion King', 'Animation', 10, "It's a really good movie");

-- Select all rows from the "movies" table to view the data
SELECT * FROM movies;