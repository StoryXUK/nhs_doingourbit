// header.js

document.addEventListener("DOMContentLoaded", function () {
    // This code runs after the DOM is fully loaded

    // Your dynamic content goes here
    var dynamicContent = "Your Dynamic Content";

    // Update the header with the dynamic content
    updateHeader(dynamicContent);
});

function updateHeader(content) {
    // Update the content of the element with the id "dynamic-header-content"
    var headerElement = document.getElementById("dynamic-header-content");

    if (headerElement) {
        headerElement.innerHTML = content;
    }
}
