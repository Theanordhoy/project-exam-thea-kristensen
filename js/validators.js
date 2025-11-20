export function isValidEmail(email) {
    const emailRegex = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRegex);
}

export function isValidPassword(password) {
    return password.length >= 8;
}

export function isValidName(name) {
    if (typeof name !== "string") {
        return false;
    }
    const nameRegex = name.trim();
    const regex = /^(?:\p{L}{2,}(?:[-']\p{L}{2,})*)(?:\s+\p{L}{2,}(?:[-']\p{L}{2,})*)+$/u;
    return regex.test(nameRegex)
}