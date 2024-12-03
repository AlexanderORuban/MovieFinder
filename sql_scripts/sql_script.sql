CREATE DATABASE recommendations;

USE recommendations;

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
	id INT AUTO_INCREMENT,
	name VARCHAR(255),
    movie VARCHAR(255),
    genre VARCHAR(255),
    rating INT,
    why TEXT,
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (id)
);

INSERT INTO movies (name, movie, genre, rating, why) VALUES ('Felix', 'Lion King', 'Animation', 10, "It's a really good movie");

SELECT * FROM movies;
