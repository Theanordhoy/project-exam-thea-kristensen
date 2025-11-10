// Define the URL of the API endpoint
const apiUrl = "https://v2.api.noroff.dev/online-shop";

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
    } catch (error) {
        console.error("Error fetching API data:", error);
    }
}


getProducts();
