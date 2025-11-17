/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    setTimeout(() => {
        window.location.href = "../html/account/login.html";
    }, 1000);
});