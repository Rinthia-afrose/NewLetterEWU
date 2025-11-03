// Create Memberships Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create memberships page

  // Form submission handling
  const createMembershipForm = document.getElementById("createMembershipForm");

  if (createMembershipForm) {
    createMembershipForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const membershipTitle = document.getElementById("membershipTitle").value;
      const membershipType = document.getElementById("membershipType").value;
      const organizationName =
        document.getElementById("organizationName").value;
      const dateAcquired = document.getElementById("dateAcquired").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (
        !membershipTitle ||
        !membershipType ||
        !organizationName ||
        !dateAcquired ||
        !shortSummary ||
        !fullArticle
      ) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // If validation passes, show success message
      alert("Membership submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createMembershipForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const membershipTitle =
          document.getElementById("membershipTitle").value;
        const membershipType = document.getElementById("membershipType").value;
        const organizationName =
          document.getElementById("organizationName").value;
        const duration = document.getElementById("duration").value;
        const dateAcquired = document.getElementById("dateAcquired").value;
        const renewalDate = document.getElementById("renewalDate").value;
        const membershipId = document.getElementById("membershipId").value;
        const organizer = document.getElementById("organizer").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const benefits = document.getElementById("benefits").value;
        const activities = document.getElementById("activities").value;
        const membersCovered = document.getElementById("membersCovered").value;
        const tags = document.getElementById("tags").value;

        // Get selected audience
        const audience = [];
        document
          .querySelectorAll('input[type="checkbox"]:checked')
          .forEach((checkbox) => {
            audience.push(checkbox.value);
          });

        // Create draft object
        const draft = {
          type: "membership",
          membershipTitle: membershipTitle,
          membershipType: membershipType,
          organizationName: organizationName,
          duration: duration,
          dateAcquired: dateAcquired,
          renewalDate: renewalDate,
          membershipId: membershipId,
          organizer: organizer,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          benefits: benefits,
          activities: activities,
          membersCovered: membersCovered,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Membership saved as draft successfully!");
        window.location.href = "drafts.html";
      });
    }
  }

  // Function to save draft to localStorage
  function saveDraft(draft) {
    // Get existing drafts from localStorage
    const draftsJson = localStorage.getItem("drafts");
    const drafts = draftsJson ? JSON.parse(draftsJson) : [];

    // Check if we're editing an existing draft
    const currentDraftIndex = localStorage.getItem("currentDraftIndex");
    if (currentDraftIndex !== null) {
      // Update existing draft
      drafts[currentDraftIndex] = draft;
      localStorage.removeItem("currentDraftIndex");
      localStorage.removeItem("currentDraft");
    } else {
      // Add new draft
      drafts.push(draft);
    }

    // Save updated drafts to localStorage
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }

  // Load draft data if editing
  loadDraftData();

  // Function to load draft data
  function loadDraftData() {
    const currentDraftJson = localStorage.getItem("currentDraft");
    if (currentDraftJson) {
      const draft = JSON.parse(currentDraftJson);

      // Fill form fields with draft data
      if (draft.membershipTitle)
        document.getElementById("membershipTitle").value =
          draft.membershipTitle;
      if (draft.membershipType)
        document.getElementById("membershipType").value = draft.membershipType;
      if (draft.organizationName)
        document.getElementById("organizationName").value =
          draft.organizationName;
      if (draft.duration)
        document.getElementById("duration").value = draft.duration;
      if (draft.dateAcquired)
        document.getElementById("dateAcquired").value = draft.dateAcquired;
      if (draft.renewalDate)
        document.getElementById("renewalDate").value = draft.renewalDate;
      if (draft.membershipId)
        document.getElementById("membershipId").value = draft.membershipId;
      if (draft.organizer)
        document.getElementById("organizer").value = draft.organizer;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.benefits)
        document.getElementById("benefits").value = draft.benefits;
      if (draft.activities)
        document.getElementById("activities").value = draft.activities;
      if (draft.membersCovered)
        document.getElementById("membersCovered").value = draft.membersCovered;
      if (draft.tags) document.getElementById("tags").value = draft.tags;

      // Set audience checkboxes
      if (draft.audience && Array.isArray(draft.audience)) {
        draft.audience.forEach((value) => {
          const checkbox = document.querySelector(
            `input[type="checkbox"][value="${value}"]`
          );
          if (checkbox) checkbox.checked = true;
        });
      }
    }
  }

  // Date validation
  const dateAcquiredInput = document.getElementById("dateAcquired");
  const renewalDateInput = document.getElementById("renewalDate");

  if (dateAcquiredInput) {
    // Set max date to today
    dateAcquiredInput.max = new Date().toISOString().split("T")[0];

    // Ensure selected date is not in the future
    dateAcquiredInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        alert("Date acquired cannot be in the future.");
        this.value = "";
      }
    });
  }

  if (renewalDateInput && dateAcquiredInput) {
    // Ensure renewal date is after date acquired
    renewalDateInput.addEventListener("change", function () {
      const renewalDate = new Date(this.value);
      const dateAcquired = new Date(dateAcquiredInput.value);

      if (dateAcquiredInput.value && renewalDate < dateAcquired) {
        alert("Renewal date must be after date acquired.");
        this.value = "";
      }
    });
  }
});
