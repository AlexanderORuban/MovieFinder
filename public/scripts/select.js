// Get references to the dropdown and custom genre inputs
const genreDropdown = document.getElementById("genre");
const customGenreInput = document.getElementById("customGenre");

// Check and update visibility based on the selected genre
function checkCustomGenre() {
    if (genreDropdown.value === "other") {
      customGenreInput.style.display = "block";
    } else {
      customGenreInput.style.display = "none";
    }
  }
  
// Initialize visibility based on the current selection
checkCustomGenre();
  
// Update visibility when the dropdown value changes
genreDropdown.addEventListener("change", checkCustomGenre);