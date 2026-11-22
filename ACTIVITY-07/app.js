
// Reusable toast notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// Smooth scrolling to booking form
function bookTicket() {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Please select your booking details!");
}

// Select form elements using DOM selectors
const match = document.getElementById("match");
const stand = document.getElementById("stand");
const quantity = document.querySelector("#quantity");

// Update Booking Summary
function updateSummary() {
    const selectedMatch = match.value;
    const selectedStand = stand.value;
    const tickets = Number(quantity.value);

    const price = Number(
        stand.options[stand.selectedIndex].dataset.price || 0
    );

    const total = price * tickets;

    document.getElementById("summaryMatch").textContent =
        "Match: " + (selectedMatch || "Not selected");

    document.getElementById("summaryStand").textContent =
        "Stand: " + (selectedStand || "Not selected");

    document.getElementById("summaryQuantity").textContent =
        "Tickets: " + tickets;

    document.getElementById("totalPrice").textContent =
        "Total Price: ₹" + total;

    showToast("Booking summary updated!");
}

// Add event listeners
match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);

// Display initial summary without notification
function displayInitialSummary() {
    document.getElementById("summaryQuantity").textContent =
        "Tickets: 1";
}

displayInitialSummary();
