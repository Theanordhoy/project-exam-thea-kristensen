const button = document.getElementById("loginButton");

function isUserLoggedIn() {
    const token = localStorage.getItem("accessToken");
    return token;
}

button.addEventListener("click", function() {
    if (!isUserLoggedIn()) {
        window.location.href = "/project-exam-thea-kristensen/html/account/login.html";
    } else {
        localStorage.removeItem("accessToken");
        window.location.href = "/project-exam-thea-kristensen/index.html";
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