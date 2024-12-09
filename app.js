// Load environment variables from the .env file
require('dotenv').config();

// Import the necessary packages (Express, MariaDB)
const express = require("express");
const mariadb = require("mariadb");

// Create a connection pool to the MariaDB database
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 20
});

// Function to establish a connection to the database
async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log("Error connecting to DB: " + err);
  }
}

// Instantiate an express (web) app
const app = express();

// Tell the app to encode data into JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Utilize static files from the "public" directory
app.use(express.static("public"));

// Set EJS as the templating engine for rendering views
app.set("view engine", "ejs");

// Define the route/default route (home page)
app.get("/", (req, res) => {
  console.log("Hello, world - server!");
  res.render("home", { data: {}, errors: [] });
});

// Handle form submission from the home page
app.post("/success", async (req, res) => {
  const data = req.body;

  let isValid = true;
  let errors = [];

  // Validate form inputs
  if (data.name.trim() === "") {
    isValid = false;
    errors.push("Please enter your name");
  }

  if (data.movie.trim() === "") {
    isValid = false;
    errors.push("Please enter a movie");
  }

  if (data.genre.trim() === "") {
    isValid = false;
    errors.push("Please enter a genre");
  }

  // Handle custom genre validation
  if (data.genre === "other") {
    if (data.customGenre.trim() === "") {
      isValid = false;
      errors.push("Please specify a custom genre")
    } else {
      data.genre = data.customGenre.trim(); // Replace genre with custom genre
      data.genre = data.genre.charAt(0).toUpperCase() + data.genre.slice(1); // Capitalize first letter for consistency
    }
  }

  if (!data.rating || isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    isValid = false;
    errors.push("Please enter a numerical rating for the movie from 1 - 10");
  }

  if (data.why.trim() === "") {
    isValid = false;
    errors.push("Please tell us why you're recommending the movie");
  }

  // If validation fails, render the home page with the errors encountered
  if (!isValid) {
    res.render("home", { data: data, errors: errors });
    return;
  }

  // Connect to the database
  const conn = await connect();

  // Insert the new movie recommendation into the database
  await conn.query(
    `INSERT INTO movies (name, movie, genre, rating, why) VALUES ('${data.name}', '${data.movie}', '${data.genre}', ${data.rating}, "${data.why}");`
  );

  // Render the success page with the details
  res.render("success", { details: data });
});

// Route to view all movie recommendations
app.get("/all-recommendations", async (req, res) => {
  const conn = await connect();
  const rows = await conn.query("SELECT * FROM movies");
  res.render("all-recommendations", { movies: rows });
});

// Route for the "lookup" page where users can search for movies
app.get("/lookup", (req, res) => {
  res.render("lookup", { data: {}, errors: [], results: [] });
});

// Handle the form submission for movie lookup
app.post("/lookup", async (req, res) => {
  const data = req.body;

  let isValid = true;
  let errors = [];
  let results = [];

  // Validate input for movie and rating
  if (data.movie.trim() === "") {
    isValid = false;
    errors.push("Please enter a movie");
  }

  if (isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    isValid = false;
    errors.push("Please enter a numerical rating from 1-10");
  }

  // Handle custom genre validation
  if (data.genre === "other") {
    if (data.customGenre.trim() === "") {
      isValid = false;
      errors.push("Please specify a custom genre")
    } else {
      data.genre = data.customGenre.trim(); // Replace genre with custom genre
    }
  }

  // If validation fails, render the lookup page with the errors encountered
  if (!isValid) {
    res.render("lookup", { data: data, errors: errors, results: results });
    return;
  }

  // Connecting to the database to run search queries
  const conn = await connect();

  try {
    let query = "SELECT * FROM movies WHERE 1=1"; // Base query to select all movies

    // Modify query based on user input for movie, genre, and rating
    if (data.movie) {
      query += ` AND movie LIKE '%${data.movie}%'`;
    }
    if (data.genre) {
      query += ` AND genre LIKE '%${data.genre}%'`;
    }
    if (data.rating) {
      query += ` AND rating >= ${data.rating}`;
    }

    // Modify query based on sorting preference
    if (data.sort === "name") {
      query += " ORDER BY movie ASC";
    } else if (data.sort === "rating") {
      query += " ORDER BY rating DESC";
    } else if (data.sort === "genre") {
      query += " ORDER BY genre ASC";
    }

    // Execute the query and get the results
    results = await conn.query(query);
  } catch (err) {
    // If an error occurs while executing the query, log the error
    console.error("Error executing query:", err);
  } finally {
    // Always release the connection back to the pool after the query is complete
    conn.release();
  }

  // Render the lookup page with the results and any errors
  res.render("lookup", { data: data, errors: errors, results: results });
});

// Route for the "recommendations" page
app.get("/recommendations", (req, res) => {
  res.render("recommendations", { data: {}, errors: [], results: [] });
});

app.post("/recommendations", async (req, res) => {
  const data = req.body;

  let isValid = true;
  let errors = [];
  let results = [];

  // Validate input for movie and rating
  if (data.genre.trim() === "") {
    isValid = false;
    errors.push("Please enter a genre");
  }

  // Handle custom genre validation
  if (data.genre === "other") {
    if (data.customGenre.trim() === "") {
      isValid = false;
      errors.push("Please specify a custom genre")
    } else {
      data.genre = data.customGenre.trim(); // Replace genre with custom genre
    }
  }

  if (isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    isValid = false;
    errors.push("Please enter a minimal numerical rating from 1-10");
  }

  if (isNaN(data.quantity) || data.quantity < 1) {
    isValid = false;
    errors.push("Please enter a quantity of 1 or more");
  }

  // If validation fails, render the recommendations page with the errors encountered
  if (!isValid) {
    res.render("recommendations", { data: data, errors: errors, results: results });
    return;
  }

  // Connecting to the database to run search queries
  const conn = await connect();

  try {
    let query = "SELECT * FROM movies WHERE 1=1"; // Base query to select all movies

    // Modify query based on user input for genre and rating
    if (data.genre) {
      query += ` AND genre LIKE '%${data.genre}%'`;
    }
    if (data.rating) {
      query += ` AND rating >= ${data.rating}`;
    }

    // Modify query based on sorting preference
    if (data.sort === "name") {
      query += " ORDER BY movie ASC";
    } else if (data.sort === "rating") {
      query += " ORDER BY rating DESC";
    } else if (data.sort === "genre") {
      query += " ORDER BY genre ASC";
    }

    // Modify the query based on the quantity of movies
    if (data.quantity) {
      query += ` LIMIT ${data.quantity}`;
    }

    // Execute the query and get the results
    results = await conn.query(query);
  } catch (err) {
    // If an error occurs while executing the query, log the error
    console.error("Error executing query:", err);
  } finally {
    // Always release the connection back to the pool after the query is complete
    conn.release();
  }

  // Render the recommendations page with the results and any errors
  res.render("recommendations", { data: data, errors: errors, results: results });
});

// Start the server and listen on the specified port
app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.APP_PORT}`);
});