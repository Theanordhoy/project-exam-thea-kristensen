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

export function isValidFirstName(firstName) {
    if (typeof firstName !== "string") return false;
    const t = firstName.trim();
    return /^\p{L}{2,}(?:[-']\p{L}{2,})*$/u.test(t);
}

export function isValidLastName(lastName) {
    if (typeof lastName !== "string") return false;
    const t = lastName.trim();
    return /^\p{L}{2,}(?:[-' ]\p{L}{2,})*$/u.test(t);
}

export function isValidPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== "string") return false;
    const t = phoneNumber.trim();
    return /^\+?[1-9]\d{7,14}$/u.test(t);
}

export function isValidAddress(address) {
    if (typeof address !== "string") return false;
    const t = address.trim();
    return /^[\p{L}\d .'-]{2,} \d{1,4}[A-Za-z]?$/u.test(t);
}

export function isValidPostalCode(postalCode) {
    if (typeof postalCode !== "string") return false;
    const t = postalCode.trim();
    return /^\d{4}$/u.test(t);
}

export function isValidCity(city) {
    if (typeof city !== "string") return false;
    const t = city.trim();
    return /^\p{L}[\p{L} .'-]*$/u.test(t);
}

export function isValidCardNumber(cardNumber) {
    if (typeof cardNumber !== "string") return false;
    const t = cardNumber.replace(/\s+/g, "");
    return /^\d{16}$/u.test(t);
}

export function isValidExpirationDate(expirationDate) {
    if (typeof expirationDate !== "string") return false;
    const t = expirationDate.trim();
    return /^(0[1-9]|1[0-2])\/\d{2}$/u.test(t);
}

export function isValidCvv(cvv) {
    if (typeof cvv !== "string") return false;
    const t = cvv.trim();
    return /^\d{3}$/u.test(t);
}