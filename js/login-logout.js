const button = document.getElementById("loginButton");

function isUserLoggedIn() {
    const token = localStorage.getItem("accessToken");
    return token;
}

button.addEventListener("click", function() {
    if (!isUserLoggedIn()) {
        window.location.href = "./html/account/login.html";
    } else {
        localStorage.removeItem("accessToken");
        window.location.href = "/index.html";
    }
})

function updateButton() {
    if (isUserLoggedIn()) {
        button.textContent = "Logout";
    } else {
        button.textContent = "Login";
    }
}

updateButton()