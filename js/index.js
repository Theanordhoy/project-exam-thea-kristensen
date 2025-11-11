// Define the URL of the API endpoint
const apiUrl = "https://v2.api.noroff.dev/online-shop";
const thumbnail = document.querySelector("#thumbnail");
const heroCarousel = document.querySelector("#heroCarousel");

async function getProducts() {
    try {
        // Send a GET request to the API endpoint
        const response = await fetch(apiUrl);
        // Check if the response is successful
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Data:", data);
        const products = data.data;
        console.log("First product:", products[0]);

        // filter() from module 3 in JavaScript https://mollify.noroff.dev/content/feu1/javascript-1/module-3/array-methods?nav=course
        const carouselProducts = products.filter(product => product.title === "Black watch" || product.title === "Black headphones" || product.title === "White sneakers");
        console.log("Carousel products:", carouselProducts);

        carouselProducts.forEach(products => {
            const heroContent = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("button");

            heroContent.className = "hero-content";
            image.className = "hero-image";
            title.className = "hero-title";

            image.src = products.image.url;
            image.alt = products.image.alt;
            title.textContent = products.title;

            heroContent.appendChild(image);
            heroContent.appendChild(title);
            heroCarousel.appendChild(heroContent);
        });

        // Carousel made with help from https://www.w3schools.com/howto/howto_js_slideshow.asp 
        // Carousel functionality
        let currentIndex = 1;
        showCarousel(currentIndex);

        // Next/previous controls
        function nextImage(n) {
           showCarousel(currentIndex += n);
        }

        // Show the carousel image based on index
        function showCarousel(n) {
            const heroContainer = document.getElementsByClassName ("hero-content");
            if (n > heroContainer.length) { currentIndex = 1;}
            if (n < 1) { currentIndex = heroContainer.length;}
            for (let i = 0; i < heroContainer.length; i++) {
                heroContainer[i].style.display = "none";
            }
            heroContainer[currentIndex - 1].style.display = "block";
        }

        // Event listeners for next/previous arrows
        const arrowRight = document.querySelector(".hero-arrow-right");
        const arrowLeft = document.querySelector(".hero-arrow-left");
        arrowRight.addEventListener("click", function() { 
            nextImage(1);
        });
        arrowLeft.addEventListener("click", function() {
            nextImage(-1);
        })

        for (let i = 0; i <= 11; i++) {
            const product = products[i];
            const thumbnailCard = document.createElement("div");
            const thumbnailImage = document.createElement("img");
            const thumbnailContent = document.createElement("div");
            const thumbnailTitle = document.createElement("h3");
            const thumbnailPrice = document.createElement("p");
            const thumbnailDiscountedPrice = document.createElement("p");

            thumbnailCard.className = "thumbnail-product-card";
            thumbnailImage.className = "thumbnail-image";
            thumbnailContent.className = "thumbnail-content";
            thumbnailTitle.className = "thumbnail-title";
            thumbnailPrice.className = "thumbnail-price";
            thumbnailDiscountedPrice.className = "thumbnail-price__discounted";

            thumbnailImage.src = product.image.url;
            thumbnailImage.alt = product.image.alt;
            thumbnailTitle.textContent = product.title;
            thumbnailPrice.textContent = `$${product.price}`;
            thumbnailDiscountedPrice.textContent = `$${product.discountedPrice}`;

            thumbnailContent.appendChild(thumbnailTitle);
            thumbnailContent.appendChild(thumbnailPrice);
            thumbnailContent.appendChild(thumbnailDiscountedPrice);
            thumbnailCard.appendChild(thumbnailImage);
            thumbnailCard.appendChild(thumbnailContent);
            thumbnail.appendChild(thumbnailCard);
        };

    } catch (error) {
        console.error("Error fetching API data:", error);
    }
}


getProducts();
