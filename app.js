// Import the Express package
const express = require('express');

// Create an Express app
const app = express();

// Set the port number for the app
const PORT = 3000;

// Encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Use files from the "public" folder
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define the root route
app.get('/', (req, res) => {
	// Log message to the console
	console.log("Hello, world - server!");

    // Render the home page
    res.render('home');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});