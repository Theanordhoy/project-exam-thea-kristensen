/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful");
        
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    } else {
        alert("Invalid email or password.");
    }


})