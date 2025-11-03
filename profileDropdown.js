// Profile Dropdown & Logout
console.log("profileDropdown.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the major events page, if so, let majorEvents.js handle the dropdown
  if (
    window.location.pathname.includes("majorEvents.html") ||
    window.location.href.includes("majorEvents.html")
  ) {
    console.log(
      "Skipping profile dropdown initialization on major events page"
    );
    // Skip initialization on major events page since it's handled by majorEvents.js
    return;
  }

  console.log("Initializing profile dropdown");

  const userBtn = document.getElementById("userBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutLink = document.getElementById("logoutLink");

  // Toggle dropdown
  if (userBtn && dropdownMenu) {
    userBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Toggle the 'active' class on the dropdown menu
      dropdownMenu.classList.toggle("show");
    });
  }

  // Close dropdown if clicking outside
  document.addEventListener("click", function (event) {
    if (
      dropdownMenu &&
      userBtn &&
      !userBtn.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      // Remove the 'active' class to hide the dropdown
      dropdownMenu.classList.remove("show");
    }
  });

  // Logout
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      window.location.href = "loginPage.html";
    });
  }
});
