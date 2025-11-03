// Drafts Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Drafts page loaded");

  // Initialize page elements
  const filterToggle = document.getElementById("filterToggle");
  const filterDropdown = document.getElementById("filterDropdown");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const clearFiltersBtn = document.getElementById("clearFilters");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const draftsContainer = document.getElementById("draftsContainer");
  const draftTypeFilter = document.getElementById("draftTypeFilter");
  const draftSortFilter = document.getElementById("draftSortFilter");

  // Load drafts when page loads
  loadDrafts();

  // Filter toggle functionality
  if (filterToggle && filterDropdown) {
    filterToggle.addEventListener("click", function () {
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

  // Apply filters
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      loadDrafts();
      // Close dropdown after applying filters
      if (filterToggle && filterDropdown) {
        filterToggle.classList.remove("active");
        filterDropdown.classList.remove("active");
      }
    });
  }

  // Clear filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function () {
      if (draftTypeFilter) draftTypeFilter.value = "";
      if (draftSortFilter) draftSortFilter.value = "date-desc";
      loadDrafts();
    });
  }

  // Clear all drafts
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete all drafts?")) {
        localStorage.removeItem("drafts");
        loadDrafts(); // Reload to show empty state
      }
    });
  }

  // Function to load and display drafts
  function loadDrafts() {
    console.log("Loading drafts...");
    const drafts = getDrafts();
    const typeFilter = draftTypeFilter ? draftTypeFilter.value : "";
    const sortFilter = draftSortFilter ? draftSortFilter.value : "date-desc";

    // Filter drafts by type if specified
    let filteredDrafts = drafts;
    if (typeFilter) {
      filteredDrafts = drafts.filter((draft) => draft.type === typeFilter);
    }

    // Sort drafts
    filteredDrafts.sort((a, b) => {
      switch (sortFilter) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    // Display drafts
    displayDrafts(filteredDrafts);
  }

  // Function to get drafts from localStorage
  function getDrafts() {
    const draftsJson = localStorage.getItem("drafts");
    return draftsJson ? JSON.parse(draftsJson) : [];
  }

  // Function to display drafts
  function displayDrafts(drafts) {
    if (!draftsContainer) return;

    if (drafts.length === 0) {
      draftsContainer.innerHTML = `
        <div class="col-12">
          <div class="no-drafts-message text-center py-5">
            <i class="bi bi-file-earmark-text" style="font-size: 3rem; color: #ccc;"></i>
            <h3 class="mt-3">No drafts found</h3>
            <p class="text-muted">Your saved drafts will appear here</p>
          </div>
        </div>
      `;
      return;
    }

    // Clear container
    draftsContainer.innerHTML = "";

    // Add drafts to container
    drafts.forEach((draft, index) => {
      const draftElement = createDraftElement(draft, index);
      draftsContainer.appendChild(draftElement);
    });
  }

  // Function to create a draft element
  function createDraftElement(draft, index) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4";

    // Format date
    const date = new Date(draft.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    col.innerHTML = `
      <div class="card draft-card h-100">
        <div class="card-body d-flex flex-column">
          <div class="draft-header mb-2">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="card-title mb-1">${
                draft.title || "Untitled Draft"
              }</h5>
              <span class="badge bg-secondary">${getDraftTypeLabel(
                draft.type
              )}</span>
            </div>
            <small class="text-muted">${formattedDate}</small>
          </div>
          <p class="card-text flex-grow-1">
            ${draft.description || "No description available"}
          </p>
          <div class="draft-actions mt-auto">
            <button class="btn btn-sm btn-primary edit-draft-btn" data-index="${index}">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger delete-draft-btn" data-index="${index}">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;

    // Add event listeners to buttons
    const editBtn = col.querySelector(".edit-draft-btn");
    const deleteBtn = col.querySelector(".delete-draft-btn");

    if (editBtn) {
      editBtn.addEventListener("click", function () {
        editDraft(index);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        deleteDraft(index);
      });
    }

    return col;
  }

  // Function to get label for draft type
  function getDraftTypeLabel(type) {
    const labels = {
      majorEvent: "Major Event",
      alumniStory: "Alumni Story",
      clubActivity: "Club Activity",
      scholarship: "Scholarship",
      library: "Library",
      recreation: "Recreation",
      cccEvent: "CCC Event",
      degreeReview: "Degree Review",
      seminar: "Seminar",
      membership: "Membership",
      trainingProgram: "Training Program",
      achievement: "Achievement",
      map: "Map",
      deptActivity: "Dept Activity",
      other: "Other",
    };
    return labels[type] || type;
  }

  // Function to edit a draft
  function editDraft(index) {
    const drafts = getDrafts();
    if (index >= 0 && index < drafts.length) {
      const draft = drafts[index];

      // Save draft data to localStorage for retrieval by edit page
      localStorage.setItem("currentDraft", JSON.stringify(draft));
      localStorage.setItem("currentDraftIndex", index);

      // Redirect to appropriate edit page based on draft type
      switch (draft.type) {
        case "majorEvent":
          window.location.href = "CreateMajorEvent.html";
          break;
        case "alumniStory":
          window.location.href = "createalumniStories.html";
          break;
        case "clubActivity":
          window.location.href = "createclubActivities.html";
          break;
        case "scholarship":
          window.location.href = "createscholarships.html";
          break;
        case "library":
          window.location.href = "createlibrary.html";
          break;
        case "recreation":
          window.location.href = "createrecreation.html";
          break;
        case "cccEvent":
          window.location.href = "createcccEvents.html";
          break;
        case "degreeReview":
          window.location.href = "createdegreeReview.html";
          break;
        case "seminar":
          window.location.href = "createseminars.html";
          break;
        case "membership":
          window.location.href = "creatememberships.html";
          break;
        case "trainingProgram":
          window.location.href = "createtrainingProgram.html";
          break;
        case "achievement":
          window.location.href = "createachievements.html";
          break;
        case "map":
          window.location.href = "createmap.html";
          break;
        case "deptActivity":
          window.location.href = "createdeptActivities.html";
          break;
        case "other":
          window.location.href = "createothers.html";
          break;
        default:
          alert("Unknown draft type");
      }
    }
  }

  // Function to delete a draft
  function deleteDraft(index) {
    if (confirm("Are you sure you want to delete this draft?")) {
      const drafts = getDrafts();
      if (index >= 0 && index < drafts.length) {
        drafts.splice(index, 1);
        localStorage.setItem("drafts", JSON.stringify(drafts));
        loadDrafts(); // Reload to show updated list
      }
    }
  }
});
