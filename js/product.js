const apiUrl = "https://v2.api.noroff.dev/online-shop";
const productContainer = document.querySelector("#productContainer");

async function getProductById() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        const data = await response.json();
        const product = data.data;
        console.log("Product data:", product);

        if (!product) {
            throw new Error(`Error loading product with ID ${productId}`);
        }

        const productContent = document.createElement("div");
        const productImage = document.createElement("img");
        const productInfo = document.createElement("div");
        const productTitle = document.createElement("h1");
        const productRating = document.createElement("p");
        const productDescription = document.createElement("p");
        const productTags = document.createElement("p");
        const productPrices = document.createElement("div");
        const productPrice = document.createElement("h3");
        const productDiscountedPrice = document.createElement("h3");
        const addToCartButton = document.createElement("button");
        const shareProduct = document.createElement("i");
        const productReview = document.createElement("div");
        const reviewTitle = document.createElement("p");
        const reviewUsername = document.createElement("p");
        const reviewStars = document.createElement("i");
        const reviewDescription = document.createElement("p");

        productContent.className = "product-content";
        productImage.className = "product-image";
        productInfo.className = "product-info";
        productTitle.className = "product-title";
        productRating.className = "product-rating";
        productDescription.className = "product-description";
        productTags.className = "product-tags";
        productPrices.className = "product-prices";
        productPrice.className = "product-price";
        productDiscountedPrice.className = "product-discounted-price";
        addToCartButton.className = "add-to-cart-button";
        shareProduct.className = "fa-solid fa-arrow-up-from-bracket share-product";
        productReview.className = "product-review";
        reviewTitle.className = "review-title";
        reviewUsername.className = "review-username";
        reviewStars.className = "fa-solid fa-star review-stars";
        reviewDescription.className = "review-description";

        productImage.src = product.image.url || "";
        productImage.alt = product.image.alt || "Product Image";
        productTitle.textContent = product.title;
        productRating.textContent = `Rating: ${product.rating} / 5`;
        productDescription.textContent = product.description;
        productTags.textContent = product.tags;
        productPrice.textContent = `$${product.price}`;
        productDiscountedPrice.textContent = `$${product.discountedPrice}`;
        addToCartButton.textContent = "Add to cart";

        if (product.reviews && product.reviews.length > 0) {
            reviewTitle.textContent = `Reviews ${product.reviews.length}`;
            reviewUsername.textContent = product.reviews[0].username;
            reviewStars.textContent = ` ${product.reviews[0].rating} `;
            reviewDescription.textContent = product.reviews[0].description;

            productReview.appendChild(reviewTitle);
            productReview.appendChild(reviewUsername);
            productReview.appendChild(reviewStars);
            productReview.appendChild(reviewDescription);
        } else {
            reviewTitle.textContent = "No reviews yet.";
            productReview.appendChild(reviewTitle);
        };
        
        productContent.appendChild(productImage);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productRating);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(productTags);
        productPrices.appendChild(productPrice);
        productPrices.appendChild(productDiscountedPrice);
        productInfo.appendChild(productPrices);
        productInfo.appendChild(addToCartButton);
        productInfo.appendChild(shareProduct);
        productContent.appendChild(productInfo);
        productContent.appendChild(productReview);
        productContainer.appendChild(productContent);


    } catch (error) {
        console.error("Error fetching product", error);
    }
}

getProductById();