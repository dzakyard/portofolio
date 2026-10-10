document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#toggle-mode");
    const button_img = button.querySelector("img");
    const body = document.querySelector("body");

    button.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        
        if (button_img.getAttribute("src") === "img/moon.png") {
            button_img.setAttribute("src", "img/sun.png");
        } else {
            button_img.setAttribute("src", "img/moon.png");
        }
    })
})