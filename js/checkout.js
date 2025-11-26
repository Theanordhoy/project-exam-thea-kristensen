const orderSummaryContent = document.querySelector(".checkout-order-summary__items");
const checkoutSubtotal = document.querySelector(".checkout-order-summary__subtotal");
const checkoutTotal = document.querySelector(".checkout-order-summary__total");
import { isValidEmail } from "./validators.js";

let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("cart data", cart);
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

checkoutSubtotal.textContent = `Subtotal $${checkoutItemsTotal.toFixed(2)}`;
checkoutTotal.textContent = `Total $${checkoutItemsTotal.toFixed(2)}`;


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