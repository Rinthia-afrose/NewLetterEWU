// Profile Dropdown and Filter Functionality

// Function to check if user has access to create/draft buttons
function hasCreateAccess() {
  // Check if user is logged in
  if (!localStorage.getItem("isLoggedIn")) {
    return false;
  }

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  // If no email found, deny access
  if (!userEmail) {
    return false;
  }

  // Check if email ends with valid domains for create access
  // Students have emails ending with "@std.ewubd.edu"
  // Faculty/Admin have emails ending with "@ewubd.edu" (but not "@std.ewubd.edu")
  if (
    userEmail.endsWith("@std.ewubd.edu") ||
    userEmail.endsWith("@ewubd.edu")
  ) {
    return true;
  }

  // For all other email domains, deny create access
  return false;
}

// Profile Dropdown and Filter Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded for category pages");
  try {
    // Check if user has access to create/draft buttons and hide/show accordingly
    const actionButtons = document.getElementById("actionButtons");
    if (actionButtons) {
      if (!hasCreateAccess()) {
        // Hide the action buttons for users without create access
        actionButtons.style.display = "none";
      }
    }

    const filterToggle = document.getElementById("filterToggle");
    const filterDropdown = document.getElementById("filterDropdown");
    const userBtn = document.getElementById("userBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutLink = document.getElementById("logoutLink");

    console.log("Elements found:", {
      actionButtons,
      filterToggle,
      filterDropdown,
      userBtn,
      dropdownMenu,
      logoutLink,
    });

    // Toggle profile dropdown
    if (userBtn && dropdownMenu) {
      console.log("User button and dropdown menu found");
      userBtn.addEventListener("click", function (event) {
        console.log("User button clicked");
        event.preventDefault();
        event.stopPropagation(); // Prevent event from bubbling to document
        dropdownMenu.classList.toggle("active");
        console.log(
          "Dropdown menu active:",
          dropdownMenu.classList.contains("active")
        );
      });
    } else {
      console.error("User button or dropdown menu not found");
    }

    // Close profile dropdown when clicking outside
    document.addEventListener("click", function (event) {
      console.log("Document clicked");
      if (dropdownMenu && dropdownMenu.classList.contains("active")) {
        // Check if click is outside the user dropdown area
        if (
          userBtn &&
          !userBtn.contains(event.target) &&
          dropdownMenu &&
          !dropdownMenu.contains(event.target)
        ) {
          console.log("Closing dropdown menu");
          dropdownMenu.classList.remove("active");
        }
      }
    });

    // Handle logout
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault();

        // Perform logout operations
        // For example, clear any stored session data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");

        // Close dropdown menu
        if (dropdownMenu) {
          dropdownMenu.classList.remove("active");
        }

        // Redirect to login page
        window.location.href = "loginPage.html";
      });
    }

    // Filter dropdown toggle
    if (filterToggle && filterDropdown) {
      filterToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event from bubbling to document
        filterToggle.classList.toggle("active");
        filterDropdown.classList.toggle("active");
      });

      // Close filter dropdown when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !filterToggle.contains(event.target) &&
          !filterDropdown.contains(event.target)
        ) {
          filterToggle.classList.remove("active");
          filterDropdown.classList.remove("active");
        }
      });
    }

    // Handle "Create new" button click for different pages
    const createBtn = document.querySelector(".create-btn");
    if (createBtn) {
      // Check if we're on the CCC Events page
      if (window.location.pathname.includes("cccEvents.html")) {
        // For CCC Events page, redirect to createcccEvents.html
        createBtn.addEventListener("click", function () {
          window.location.href = "createcccEvents.html";
        });
      }
      // Check if we're on the Seminars page
      else if (window.location.pathname.includes("seminars.html")) {
        // For Seminars page, redirect to createseminars.html
        createBtn.addEventListener("click", function () {
          window.location.href = "createseminars.html";
        });
      }
      // For other pages, the onclick attribute in HTML will handle the redirect
      // We don't add another event listener to avoid conflicts
    }

    // Handle "Generate PDF" button click
    const generatePdfBtn = document.querySelector(".generate-pdf-btn");
    if (generatePdfBtn) {
      generatePdfBtn.addEventListener("click", function () {
        // Show a message that PDF generation is not implemented yet
        alert("PDF generation functionality would be implemented here.");

        // In a real implementation, you would:
        // 1. Collect the filtered data
        // 2. Send it to a server-side PDF generation service
        // 3. Or use a client-side library like jsPDF to generate the PDF
        // 4. Trigger the download of the generated PDF
      });
    }

    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarCheckbox = document.getElementById("sidebar-toggle-checkbox");

    if (sidebarToggle && sidebarCheckbox) {
      sidebarToggle.addEventListener("click", function (event) {
        event.preventDefault();
        sidebarCheckbox.checked = !sidebarCheckbox.checked;
      });
    }

    // Close sidebar when clicking the close button
    const closeSidebar = document.getElementById("closeSidebar");
    if (closeSidebar && sidebarCheckbox) {
      closeSidebar.addEventListener("click", function (event) {
        event.preventDefault();
        sidebarCheckbox.checked = false;
      });
    }
  } catch (error) {
    console.error("Error in DOMContentLoaded for category pages:", error);
  }
});
