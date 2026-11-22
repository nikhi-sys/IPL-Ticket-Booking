
// Reusable toast notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Smooth scrolling to booking form
function bookTicket() {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Please fill in your booking details!");
}

// Handle booking form submission
function confirmBooking(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const match = document.getElementById("match").value;
    const tickets = document.getElementById("tickets").value;

    showToast("Booking confirmed for " + name + "!");

    alert(
        "Booking Successful!\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Match: " + match + "\n" +
        "Tickets: " + tickets
    );

    document.querySelector("form").reset();
}
