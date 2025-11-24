const loadingSpinner = document.querySelector(".loading-spinner");

export function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = "block";
    }
};

export function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = "none";
    }
};