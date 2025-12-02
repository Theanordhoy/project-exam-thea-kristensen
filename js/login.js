/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
/* https://noroff-my.sharepoint.com/personal/talitha_kruger_noroff_no/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FGuide%20to%20API%20Authentication%201%205%2Epdf&parent=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1 */
import { isValidEmail, isValidPassword } from "./validators.js";
import { showLoading, hideLoading } from "./loading.js";
import { showAlert } from "./alert.js";

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    showLoading();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showAlert("Please enter both email and password.", "error", 3000);
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
            showAlert("Login successful!", "success", 3000);
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);
        } else {
            showAlert("Login failed: " + (data.errors?.[0]?.message || "Check console for details."), "error", 3000);
        }
    } catch (error) {
        console.error("Login request failed:", error);
        showAlert("Something went wrong. Please try again later.", "error", 3000);
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

    