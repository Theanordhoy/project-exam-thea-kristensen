/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
/* https://noroff-my.sharepoint.com/personal/talitha_kruger_noroff_no/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FGuide%20to%20API%20Authentication%201%205%2Epdf&parent=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1 */
import { isValidEmail, isValidPassword } from "./validators.js";
import { showLoading, hideLoading } from "./loading.js";

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    showLoading();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const credentials = { email, password };

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("profileName", data.data.name);
            alert("Login successful!");
            setTimeout(() => {
                window.location.href = "/index.html";
            });
        } else {
            console.log("Login error:", data);
            alert("Login failed: " + (data.errors?.[0]?.message || "Check console for details."));
        }
    } catch (error) {
        console.error("Login request failed:", error);
        alert("Something went wrong. Please try again later.");
    } finally {
        hideLoading();
    }
});

const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
email.setAttribute("aria-describedby", "emailError");
const password = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
password.setAttribute("aria-describedby", "passwordError");

/* Live validation */
email.addEventListener("blur", function() {
    if (!isValidEmail(email.value)) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});

password.addEventListener("blur", function() {
    if (!isValidPassword(password.value)) {
        passwordError.textContent = "Password must be at least 8 characters.";
    } else {
        passwordError.textContent = "";
    }
});

    