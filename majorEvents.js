// Profile Dropdown and Filter Functionality
console.log("majorEvents.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded for major events page");
  try {
    const filterToggle = document.getElementById("filterToggle");
    const filterDropdown = document.getElementById("filterDropdown");
    const userBtn = document.getElementById("userBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutLink = document.getElementById("logoutLink");

    console.log("Elements found:", {
      filterToggle,
      filterDropdown,
      userBtn,
      dropdownMenu,
      logoutLink,
    });

    // Toggle profile dropdown
    if (userBtn && dropdownMenu) {
      console.log("User button and dropdown menu found");
      console.log("Attaching click event listener to user button");
      userBtn.addEventListener("click", function (event) {
        console.log("User button clicked");
        console.log("Event target:", event.target);
        event.preventDefault();
        event.stopPropagation(); // Prevent event from bubbling up to document

        // Toggle dropdown visibility
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
          // Also reset other CSS properties that affect visibility
          dropdownMenu.style.opacity = "0";
          dropdownMenu.style.visibility = "hidden";
          dropdownMenu.style.transform = "translateY(-10px)";
          dropdownMenu.style.pointerEvents = "none";
        } else {
          dropdownMenu.style.display = "block";
          // Also set other CSS properties that affect visibility
          dropdownMenu.style.opacity = "1";
          dropdownMenu.style.visibility = "visible";
          dropdownMenu.style.transform = "translateY(0)";
          dropdownMenu.style.pointerEvents = "auto";
        }
        console.log("Dropdown menu display:", dropdownMenu.style.display);
      });
    } else {
      console.error("User button or dropdown menu not found");
    }

    // Close profile dropdown when clicking outside
    document.addEventListener("click", function (event) {
      console.log("Document clicked");

      // Close dropdown when clicking outside
      if (
        dropdownMenu &&
        userBtn &&
        !userBtn.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        console.log("Closing dropdown menu");
        dropdownMenu.style.display = "none";
        // Also reset other CSS properties that affect visibility
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
        dropdownMenu.style.transform = "translateY(-10px)";
        dropdownMenu.style.pointerEvents = "none";
      }
    });

    // Handle logout
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault();

        // Perform logout operations
        // Clear stored session data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");

        // Close dropdown menu
        if (dropdownMenu) {
          dropdownMenu.style.display = "none";
          // Also reset other CSS properties that affect visibility
          dropdownMenu.style.opacity = "0";
          dropdownMenu.style.visibility = "hidden";
          dropdownMenu.style.transform = "translateY(-10px)";
          dropdownMenu.style.pointerEvents = "none";
        }

        // Redirect to login page
        window.location.href = "loginPage.html";
      });
    }

    // Filter dropdown toggle
    if (filterToggle && filterDropdown) {
      filterToggle.addEventListener("click", function () {
        filterToggle.classList.toggle("active");
        filterDropdown.classList.toggle("active");
      });

      // Close filter dropdown when clicking outside
      document.addEventListener("click", function (event) {
        // Don't close filter dropdown if profile dropdown is active
        if (dropdownMenu && dropdownMenu.classList.contains("active")) {
          return;
        }

        if (
          !filterToggle.contains(event.target) &&
          !filterDropdown.contains(event.target)
        ) {
          filterToggle.classList.remove("active");
          filterDropdown.classList.remove("active");
        }
      });
    }
  } catch (error) {
    console.error("Error in DOMContentLoaded for major events page:", error);
  }
});
