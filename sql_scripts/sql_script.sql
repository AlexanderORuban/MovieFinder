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
VALUES 
('Felix', 'Lion King', 'Animation', 10, "It's a really good movie"),
('Alex', 'The Fast and The Furious', 'Action', 9, "Great movie with a good plot"),
('Bob', 'The Matrix', 'Sci-Fi', 8, "Interesting and great plot"),
('Alex', 'Bullet Train', 'Action', 7, "Great action and interesting plot twists"),
('John', 'Frozen', 'Animation', 6, "Great movie for kids"),
('Bob', 'Avatar', 'Sci-Fi', 5, "Great visuals, but an okay plot"),
('Sarah', 'Titanic', 'Romance', 9, "Famous romance story"),
('Andy', 'Catch Me If You Can', 'Comedy', 10, "Great story and funny twists"),
('Michael', 'Fight Club', 'Action', 8, "Action packed and interesting plot"),
('Felix', 'The Lion King 2', 'Animation', 4, "Great sequel, but not as good as the first"),
('John', 'The Dark Knight', 'Action', 10, "Amazing action and story with a legendary performance by Heath Ledger"),
('Felix', 'The Matrix Reloaded', 'Sci-Fi', 6, "The action is great, but the plot can be confusing"),
('Alex', 'The Dark Knight Rises', 'Action', 9, "Great conclusion to the trilogy, but not as strong as the first two"),
('Bob', 'The Godfather', 'Crime', 10, "One of the greatest films ever made"),
('Sarah', 'Jurassic Park', 'Sci-Fi', 9, "A thrilling and groundbreaking movie for its time"),
('Emma', 'Pulp Fiction', 'Crime', 10, "Masterpiece with unforgettable characters"),
('Daniel', 'Gladiator', 'Action', 9, "Epic story, great performances, and unforgettable moments"),
('Sophia', 'Forrest Gump', 'Drama', 9, "A beautiful, heartwarming story with Tom Hanks at his best"),
('Michael', 'Shutter Island', 'Mystery', 7, "Intriguing plot with a great twist at the end"),
('Olivia', 'The Godfather Part II', 'Crime', 10, "A rare sequel that is just as good, if not better than the original"),
('Victor', 'Whiplash', 'Drama', 8, "Intense and powerful performances with an unforgettable ending"),
('Liam', 'Memento', 'Thriller', 9, "A brilliant psychological thriller that keeps you on edge"),
('John', 'Inception', 'Sci-Fi', 9, "Mind-bending concept and stunning visuals"),
('Alex', 'Interstellar', 'Sci-Fi', 10, "A visually stunning and emotionally deep film by Christopher Nolan"),
('Emily', 'The Prestige', 'Thriller', 8, "A clever and well-executed story with fantastic performances"),
('Bob', 'The Social Network', 'Drama', 9, "An engaging drama about the creation of Facebook"),
('Felix', 'Mad Max: Fury Road', 'Action', 7, "Non-stop action with a unique visual style but weak plot"),
('Sarah', 'La La Land', 'Musical', 9, "A beautifully shot film with great music and performances");

-- Select all rows from the "movies" table to view the data
SELECT * FROM movies;