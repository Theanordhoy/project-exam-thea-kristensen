/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
/* https://noroff-my.sharepoint.com/personal/talitha_kruger_noroff_no/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FGuide%20to%20API%20Authentication%201%205%2Epdf&parent=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1 */
import { isValidName, isValidEmail, isValidPassword } from "./validators.js";
import { showLoading, hideLoading } from "./loading.js";

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    showLoading();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! You can now log in.");
      } else {
        console.log("Raw error response:", data);
        alert(
          "Registration failed: " +
            (data.errors?.[0]?.message || "Check console for details.")
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      hideLoading();
    }
  });
 
  const name = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  name.setAttribute("aria-describedby", "nameError");
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  email.setAttribute("aria-describedby", "emailError");
  const password = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  password.setAttribute("aria-describedby", "passwordError");

  /* Live validation */
  name.addEventListener("blur", function () {
    if (!isValidName(name.value)) {
      nameError.textContent = "Please enter your first and last name.";
    } else {
      nameError.textContent = "";
    }
  });

  email.addEventListener("blur", function () {
    if (!isValidEmail(email.value)) {
      emailError.textContent = "Please enter a valid email address.";
    } else {
      emailError.textContent = "";
    }
  });

  password.addEventListener("blur", function () {
    if (!isValidPassword(password.value)) {
      passwordError.textContent = "Password must be at least 8 characters.";
    } else {
      passwordError.textContent = "";
    }
  });