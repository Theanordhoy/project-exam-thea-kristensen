const cartContent = document.querySelector(".cart-items");
const cartSubtotal = document.querySelector(".cart-order-summary__subtotal");
const totalPrice = document.querySelector(".cart-order-summary__total");

let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("cart data", cart);
    } catch (error) {
        console.error("Error parsing cart data from localStorage", error);
    };

/* Groups products with the same ID and count their quantity */ 
const groupedCart = [];
cart.forEach(product => {
    const existingProduct = groupedCart.findIndex(item => item.id === product.id);
    if (existingProduct !== -1) {
        groupedCart[existingProduct].quantity += 1;
    } else {
        groupedCart.push({...product, quantity: 1});
    };
});

const cartItems = groupedCart;
let cartItemsTotal = 0;

/* Create cart items */
if (cartItems.length === 0) {
    cartContent.textContent = "Your cart is empty.";
} else {
    cartItems.forEach (product => {
        const cartProduct = document.createElement("div");
        const productImage = document.createElement("img");
        const productInfo = document.createElement("div");
        const productTitle = document.createElement("h3");
        const productDiscountedPrice = document.createElement("p");
        const productQuantity = document.createElement("div");
        const quantityPlus = document.createElement("button");
        const quantityMinus = document.createElement("button");
        const quantityValue = document.createElement("p");
        const removeProduct = document.createElement("i");

        cartProduct.className = "cart-product";
        productImage.className = "cart-product__image";
        productInfo.className = "cart-product__info";
        productTitle.className = "cart-product__title";
        productDiscountedPrice.className = "cart-product__discounted-price";
        productQuantity.className = "cart-product__quantity";
        quantityPlus.className = "quantity-plus";
        quantityMinus.className = "quantity-minus";
        quantityValue.className = "quantity-value";
        removeProduct.className = "fa-solid fa-trash remove-product";

        productImage.src = product.image.url;
        productImage.alt = product.image.alt;
        productTitle.textContent = product.title;
        productDiscountedPrice.textContent = `$${product.discountedPrice}`;
        quantityValue.textContent = `${product.quantity}`;
        quantityPlus.textContent = "+";
        quantityMinus.textContent = "-";

        cartItemsTotal += product.discountedPrice * product.quantity;

        cartProduct.appendChild(productImage);
        cartProduct.appendChild(productInfo);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productDiscountedPrice);
        cartProduct.appendChild(productQuantity);
        productQuantity.appendChild(quantityMinus);
        productQuantity.appendChild(quantityValue);
        productQuantity.appendChild(quantityPlus);
        cartProduct.appendChild(removeProduct);
        cartContent.appendChild(cartProduct);

        /* Event listeners for quantity and removal of products */
        quantityPlus.addEventListener("click", () => {
            changeQuantity(product.id, 1);
        });

        quantityMinus.addEventListener("click", () => {
            changeQuantity(product.id, -1);
        });

        removeProduct.addEventListener("click", () => {
            deleteProduct(product.id);
        })

    })
}

totalPrice.textContent = `Total $${cartItemsTotal.toFixed(2)}`;
cartSubtotal.textContent = `Subtotal $${cartItemsTotal.toFixed(2)}`;

/* Change product quantity in cart */
function changeQuantity(productId, change) {
    try {
        if (change > 0) {
            const product = cart.find(item => item.id === productId);
            if (product) {
                cart.push({...product});
            }
        } else {
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error updating cart", error);
        showAlert("There was an error updating the cart. Please try again.");
    } finally {
        updateCartCount();
        window.location.reload();
    }
}

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

/* Delete product from cart */
function deleteProduct(productID) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productID);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

/* Clear cart functionality */
const clearCartButton = document.querySelector(".cart-clear-button");
clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    updateCartCount();
    window.location.reload();
});

function clearCartButtonVisibility() {
    if (cart.length === 0) {
        clearCartButton.style.display = "none";
    } else {
        clearCartButton.style.display = "block";
    }
}

clearCartButtonVisibility();


