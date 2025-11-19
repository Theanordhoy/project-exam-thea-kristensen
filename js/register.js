/* https://innosufiyan.hashnode.dev/create-signup-login-page-vanilla-javascript */
/* https://noroff-my.sharepoint.com/personal/talitha_kruger_noroff_no/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FGuide%20to%20API%20Authentication%201%205%2Epdf&parent=%2Fpersonal%2Ftalitha%5Fkruger%5Fnoroff%5Fno%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1 */
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
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
    }
  });
 