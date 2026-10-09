document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#toggle-mode");
    const body = document.querySelector("body");

    button.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
    })
})