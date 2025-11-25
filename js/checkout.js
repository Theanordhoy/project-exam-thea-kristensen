const orderSummaryContent = document.querySelector(".checkout-order-summary__items");
const checkoutSubtotal = document.querySelector(".checkout-order-summary__subtotal");
const checkoutTotal = document.querySelector(".checkout-order-summary__total");

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