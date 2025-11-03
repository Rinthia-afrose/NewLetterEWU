// Print Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Print page loaded");

  // Get DOM elements
  const categoryFilter = document.getElementById("categoryFilter");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const customRangeSelect = document.getElementById("customRange");
  const generateReportBtn = document.getElementById("generateReport");
  const clearFiltersBtn = document.getElementById("clearFilters");

  // Set default date range to last 30 days
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(today.getDate() - 30);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set default dates
  startDateInput.value = formatDate(lastMonth);
  endDateInput.value = formatDate(today);

  // Handle custom range selection
  customRangeSelect.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
      const months = parseInt(selectedValue);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - months);

      startDateInput.value = formatDate(startDate);
      endDateInput.value = formatDate(endDate);
    }
  });

  // Handle generate report button click
  generateReportBtn.addEventListener("click", function () {
    const selectedCategory = categoryFilter.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    // Validate dates
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be later than end date.");
      return;
    }

    // In a real implementation, this would generate the report
    // For now, we'll just show an alert with the selected filters
    alert(`Generating report for:
    Category: ${selectedCategory}
    Date Range: ${startDate} to ${endDate}`);

    // Here you would implement the actual report generation logic
    // This might involve making an API call to fetch data based on filters
    console.log("Generating report with filters:", {
      category: selectedCategory,
      startDate: startDate,
      endDate: endDate,
    });
  });

  // Handle clear filters button click
  clearFiltersBtn.addEventListener("click", function () {
    categoryFilter.value = "all";
    customRangeSelect.value = "";

    // Reset to default date range
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    startDateInput.value = formatDate(lastMonth);
    endDateInput.value = formatDate(today);
  });

  // Handle profile dropdown functionality
  const userBtn = document.getElementById("userBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutLink = document.getElementById("logoutLink");

  if (userBtn && dropdownMenu) {
    userBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });
  }

  // Close profile dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (dropdownMenu && dropdownMenu.classList.contains("active")) {
      if (
        userBtn &&
        !userBtn.contains(event.target) &&
        dropdownMenu &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.remove("active");
      }
    }
  });

  // Handle logout
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();

      // Perform logout operations
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
});
