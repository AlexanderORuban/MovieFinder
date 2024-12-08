// Get references to the dropdown and custom genre inputs
const genreDropdown = document.getElementById("genre");
const customGenreInput = document.getElementById("customGenre");

// Check the initial value of the genre dropdown
if (genreDropdown.value === "other") {
    // If the selected value is "other", display the custom genre text box
    customGenreInput.display = "block";
} else {
    // Otherwise, hide the custom genre text box
    customGenreInput.style.display = "none";
}

// Add an event listener to the genre dropdown for change events
genreDropdown.addEventListener("change", () => {
    // Check if the selected genre is "other"
    if (genreDropdown.value === "other") {
        // If so, show the custom genre text box
        customGenreInput.style.display = "block";
    } else {
        // If not, hide the custom genre text box
        customGenreInput.style.display = "none";
    }
});