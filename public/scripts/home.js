const genreDropdown = document.getElementById("genre");
const customGenreInput = document.getElementById("customGenre");

genreDropdown.addEventListener("change", () => {
    if (genreDropdown.value === "other") {
        customGenreInput.style.display = "block";
    }
});