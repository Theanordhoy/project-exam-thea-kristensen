const orderSummaryContent = document.querySelector(".checkout-order-summary__items");
const checkoutSubtotal = document.querySelector(".checkout-order-summary__subtotal");
const checkoutTotal = document.querySelector(".checkout-order-summary__total");
import { isValidEmail, isValidFirstName, isValidLastName, isValidPhoneNumber, isValidAddress, isValidPostalCode, isValidCity, isValidName, isValidCardNumber, isValidExpirationDate, isValidCvv } from "./validators.js";

let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        console.error("Error parsing cart data from localStorage", error);
    }

/* Groups products with the same ID and count their quantity */
const groupedCart = [];
cart.forEach(product => {
    const existingProduct = groupedCart.findIndex(item => item.id === product.id);
    if (existingProduct !== -1) {
        groupedCart[existingProduct].quantity += 1;
    } else {
        groupedCart.push({...product, quantity: 1});
    }
});

const checkoutItems = groupedCart;
let checkoutItemsTotal = 0;

checkoutItems.forEach (product => {
    const checkoutContent = document.createElement("div");
    const checkoutImage = document.createElement("img");
    const checkoutInfo = document.createElement("div");
    const checkoutTitle = document.createElement("h3");
    const checkoutQuantity = document.createElement("p");
    const checkoutPrice = document.createElement("p");

    checkoutContent.className = "checkout-order-summary__content";
    checkoutImage.className = "checkout-item-image";
    checkoutInfo.className = "checkout-order-summary__info";
    checkoutTitle.className = "checkout-order-summary__title";
    checkoutQuantity.className = "checkout-order-summary__quantity";
    checkoutPrice.className = "checkout-order-summary__price";

    checkoutImage.src = product.image.url;
    checkoutImage.alt = product.image.alt;
    checkoutTitle.textContent = product.title;
    checkoutQuantity.textContent = `Quantity:${product.quantity}`;
    checkoutPrice.textContent = `$${product.discountedPrice}`;

    checkoutItemsTotal += product.discountedPrice * product.quantity;

    checkoutContent.appendChild(checkoutImage);
    checkoutContent.appendChild(checkoutInfo);
    checkoutInfo.appendChild(checkoutTitle);
    checkoutInfo.appendChild(checkoutQuantity);
    checkoutInfo.appendChild(checkoutPrice);
    orderSummaryContent.appendChild(checkoutContent);

});

checkoutSubtotal.textContent = `$${checkoutItemsTotal.toFixed(2)}`;
checkoutTotal.textContent = `$${checkoutItemsTotal.toFixed(2)}`;


/* Update cart count in the header */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.querySelector(".cart-count");
    const count = cart.length;

    if (cartCount) {
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.style.display = "inline";
        } else {
            cartCount.textContent = "";
            cartCount.style.display = "none";
        }
    }
}

updateCartCount();

/* Get input fields and error from form */
const emailEl = document.getElementById("email");
const firstNameEl = document.getElementById("firstname");
const lastNameEl = document.getElementById("lastname");
const phoneNumberEl = document.getElementById("phonenumber");
const addressEl = document.getElementById("address");
const postalCodeEl = document.getElementById("postalcode");
const cityEl = document.getElementById("city");
const nameOnCardEl = document.getElementById("nameoncard");
const cardNumberEl = document.getElementById("cardnumber");
const expirationDateEl = document.getElementById("expirationdate");
const cvvEl = document.getElementById("cvv");

const emailError = document.getElementById("emailError");
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const phoneNumberError = document.getElementById("phoneNumberError");
const addressError = document.getElementById("addressError");
const postalCodeError = document.getElementById("postalCodeError");
const cityError = document.getElementById("cityError");
const nameOnCardError = document.getElementById("nameOnCardError");
const cardNumberError = document.getElementById("cardNumberError");
const expirationDateError = document.getElementById("expirationDateError");
const cvvError = document.getElementById("cvvError");

/* Live validation */ 
emailEl.addEventListener("blur", function() {
    if (!isValidEmail(emailEl.value)) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});

firstNameEl.addEventListener("blur", function() {
    if (!isValidFirstName(firstNameEl.value)) {
        firstNameError.textContent = "Please enter your first name";
    } else {
        firstNameError.textContent = "";
    }
});

lastNameEl.addEventListener("blur", function() {
    if (!isValidLastName(lastNameEl.value)) {
        lastNameError.textContent = "Please enter your last name";
    } else {
        lastNameError.textContent = "";
    }
});

phoneNumberEl.addEventListener("blur", function() {
    if (!isValidPhoneNumber(phoneNumberEl.value)) {
        phoneNumberError.textContent = "Please enter a phone number with 8 to 15 numbers";
    } else {
        phoneNumberError.textContent = "";
    }
});

addressEl.addEventListener("blur", function () {
    if (!isValidAddress(addressEl.value)) {
        addressError.textContent = "Please enter your address";
    } else {
        addressError.textContent = "";
    }
});

postalCodeEl.addEventListener("blur", function () {
    if (!isValidPostalCode(postalCodeEl.value)) {
        postalCodeError.textContent = "Enter your postal code (4 numbers)";
    } else {
        postalCodeError.textContent = "";
    }
});

cityEl.addEventListener("blur", function () {
    if (!isValidCity(cityEl.value)) {
        cityError.textContent = "Please enter your city";
    } else {
        cityError.textContent = "";
    }
});

nameOnCardEl.addEventListener("blur", function () {
    if (!isValidName(nameOnCardEl.value)) {
        nameOnCardError.textContent = "Please enter the name on the card";
    } else {
        nameOnCardError.textContent = "";
    }
});

cardNumberEl.addEventListener("blur", function () {
    if (!isValidCardNumber(cardNumberEl.value)) {
        cardNumberError.textContent = "Please enter your card number (16 numbers)";
    } else {
        cardNumberError.textContent = "";
    }
});

expirationDateEl.addEventListener("blur", function () {
    if (!isValidExpirationDate(expirationDateEl.value)) {
        expirationDateError.textContent = "Please enter the expiration date (MM/YY)";
    } else {
        expirationDateError.textContent = "";
    }
});

cvvEl.addEventListener("blur", function () {
    if (!isValidCvv(cvvEl.value)) {
        cvvError.textContent = "Please enter CVV (3 numbers)"
    } else {
        cvvError.textContent = "";
    }
});

/* Form submit function with validators */
const placeOrderButton = document.querySelector(".checkout-form__button");

placeOrderButton.addEventListener("click", function(e) {
    e.preventDefault();

    let isValid = true;

    if (!isValidEmail(emailEl.value)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (!isValidFirstName(firstNameEl.value)) {
        firstNameError.textContent = "Please enter your first name";
        isValid = false;
    } else {
        firstNameError.textContent = "";
    }

    if (!isValidLastName(lastNameEl.value)) {
        lastNameError.textContent = "Please enter your last name";
        isValid = false;
    } else {
        lastNameError.textContent = "";
    }

    if (!isValidPhoneNumber(phoneNumberEl.value)) {
        phoneNumberError.textContent = "Please enter a phone number with 8 to 15 numbers";
        isValid = false;
    } else {
        phoneNumberError.textContent = "";
    }

    if (!isValidAddress(addressEl.value)) {
        addressError.textContent = "Please enter your address";
        isValid = false;
    } else {
        addressError.textContent = "";
    }

    if (!isValidPostalCode(postalCodeEl.value)) {
        postalCodeError.textContent = "Please enter a valid postal code with 4 numbers";
        isValid = false;
    } else {
        postalCodeError.textContent = "";
    }

    if (!isValidCity(cityEl.value)) {
        cityError.textContent = "Please enter your city";
        isValid = false;
    } else {
        cityError.textContent = "";
    }

    const paymentMethod = document.querySelector("input[name='payment']:checked");
    if (!paymentMethod) {
        paymentError.textContent = "Please select a payment method.";
        isValid = false;
    } else {
        paymentError.textContent = "";
    }

    if (paymentMethod && paymentMethod.value === "creditcard") {
        if (!isValidName(nameOnCardEl.value)) {
            nameOnCardError.textContent = "Please enter the name on the card";
            isValid = false;
        } else {
            nameOnCardError.textContent = "";
        }

        if (!isValidCardNumber(cardNumberEl.value)) {
            cardNumberError.textContent = "Please enter your card number (16 numbers)";
            isValid = false;
        } else {
            cardNumberError.textContent = "";
        }

        if (!isValidExpirationDate(expirationDateEl.value)) {
            expirationDateError.textContent = "Please enter the expiration date (MM/YY)";
            isValid = false;
        } else {
            expirationDateError.textContent = "";
        }

        if (!isValidCvv(cvvEl.value)) {
            cvvError.textContent = "Please enter CVV (3 numbers)"
            isValid = false;
        } else {
            cvvError.textContent = "";
        }
    }

    if (isValid) {
        window.location.href = placeOrderButton.href;
    }
});
