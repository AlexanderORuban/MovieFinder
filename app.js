// Get the express package
const express = require("express");

const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "recommendations",
});

async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log("Error connectiong to DB: " + err);
  }
}

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set("view engine", "ejs");

// Define a "default" route
app.get("/", (req, res) => {
  // Log message to the server's console
  console.log("Hello, world - server!");
  res.render("home", { data: [], errors: [] });
});

app.post("/confirm", async (req, res) => {
  const data = req.body;

  let isValid = true;
  let errors = [];

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

  if (data.rating.trim() === "" || data.rating > 10 || data.rating < 0) {
    isValid = false;
    errors.push("Please enter a rating for the movie from 1 - 10");
  }

  if (data.why.trim() === "") {
    isValid = false;
    errors.push("Please tell us why you're recommending the movie");
  }

  if (!isValid) {
    res.render("home", { data: data, errors: errors });
    return;
  }
  // Connect to database
  const conn = await connect();

  // Insert order into the database
  await conn.query(
    `INSERT INTO movies (name, movie, genre, rating, why) VALUES ('${data.name}', '${data.movie}', '${data.genre}', '${data.rating}', "${data.why}");`
  );

  res.render("recommended", { details: data });
});

app.get("/recommendations", async (req, res) => {
  const conn = await connect();
  const rows = await conn.query("SELECT * FROM movies");
  res.render("recommendations", { movies: rows });
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
