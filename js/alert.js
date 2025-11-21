export function showAlert(message, type = "error", duration = 3000) {
    const alertBox = document.querySelector(".alert-message");
    if (alertBox) {
        alertBox.textContent = message;
        alertBox.classList.remove("alert-error", "alert-success");
        alertBox.classList.add(`alert-${type}`);
        alertBox.style.display = "block";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, duration);
    } else {
        alert(message);
    }
}