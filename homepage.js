// Sidebar and Profile Dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");
  try {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const userBtn = document.getElementById("userBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutLink = document.getElementById("logoutLink");
    const actionButtons = document.getElementById("actionButtons");
    console.log("Elements found:", {
      sidebar,
      sidebarToggle,
      closeSidebar,
      userBtn,
      dropdownMenu,
      logoutLink,
      actionButtons,
    });

    // Check if elements exist
    if (!userBtn) {
      console.error("User button not found");
    }
    if (!dropdownMenu) {
      console.error("Dropdown menu not found");
    }

    // Close dropdown when clicking outside
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

    // Close sidebar on escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const checkbox = document.getElementById("sidebar-toggle-checkbox");
        checkbox.checked = false;
      }
    });

    // Handle user dropdown toggle
    if (userBtn && dropdownMenu) {
      console.log("User button and dropdown menu found");
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
    }

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

    // Add hover effects to sidebar links
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.transform = "translateX(5px)";
      });

      link.addEventListener("mouseleave", function () {
        this.style.transform = "translateX(0)";
      });
    });

    // Show action buttons only for admin or faculty users
    if (actionButtons) {
      // Function to check if user is admin or faculty
      function isAdminOrFaculty() {
        const userRole = localStorage.getItem("userRole");
        return userRole === "admin" || userRole === "faculty";
      }

      // Show buttons if user is admin or faculty
      if (isAdminOrFaculty()) {
        actionButtons.style.display = "flex";
      }
    }
  } catch (error) {
    console.error("Error in DOMContentLoaded:", error);
  }
});
