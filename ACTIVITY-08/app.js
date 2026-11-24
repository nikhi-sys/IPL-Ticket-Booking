
// Hamburger menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Team filter
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function () {
    const selectedTeam = teamFilter.value;

    matchCards.forEach(function (card) {
        const teams = card.dataset.teams;

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Grid and list view toggle
const matchContainer = document.getElementById("matchContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

gridBtn.addEventListener("click", function () {
    matchContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", function () {
    matchContainer.classList.add("list-view");
});
