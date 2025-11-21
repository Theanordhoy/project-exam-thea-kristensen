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