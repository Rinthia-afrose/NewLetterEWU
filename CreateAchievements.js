// Create Achievements Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create achievements page

  // Form submission handling
  const createAchievementForm = document.getElementById(
    "createAchievementForm"
  );

  if (createAchievementForm) {
    createAchievementForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("achievementTitle").value;
      const achievementType = document.getElementById("achievementType").value;
      const awardedTo = document.getElementById("awardedTo").value;
      const achievementDate = document.getElementById("achievementDate").value;
      const awardingBody = document.getElementById("awardingBody").value;
      const level = document.getElementById("level").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (
        !title ||
        !achievementType ||
        !awardedTo ||
        !achievementDate ||
        !awardingBody ||
        !level ||
        !shortSummary ||
        !fullArticle
      ) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // If validation passes, show success message
      alert("Achievement submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createAchievementForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const title = document.getElementById("achievementTitle").value;
        const achievementType =
          document.getElementById("achievementType").value;
        const awardedTo = document.getElementById("awardedTo").value;
        const achievementDate =
          document.getElementById("achievementDate").value;
        const awardingBody = document.getElementById("awardingBody").value;
        const level = document.getElementById("level").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const eventName = document.getElementById("eventName").value;
        const objectives = document.getElementById("objectives").value;
        const outcomes = document.getElementById("outcomes").value;
        const videoLink = document.getElementById("videoLink").value;
        const tags = document.getElementById("tags").value;
        const department = document.getElementById("department").value;
        const recipientNames = document.getElementById("recipientNames").value;

        // Get selected audience
        const audience = [];
        document
          .querySelectorAll('input[type="checkbox"]:checked')
          .forEach((checkbox) => {
            audience.push(checkbox.value);
          });

        // Create draft object
        const draft = {
          type: "achievement",
          title: title,
          achievementType: achievementType,
          awardedTo: awardedTo,
          achievementDate: achievementDate,
          awardingBody: awardingBody,
          level: level,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          eventName: eventName,
          objectives: objectives,
          outcomes: outcomes,
          videoLink: videoLink,
          tags: tags,
          department: department,
          recipientNames: recipientNames,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Achievement saved as draft successfully!");
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
      if (draft.title)
        document.getElementById("achievementTitle").value = draft.title;
      if (draft.achievementType)
        document.getElementById("achievementType").value =
          draft.achievementType;
      if (draft.awardedTo)
        document.getElementById("awardedTo").value = draft.awardedTo;
      if (draft.achievementDate)
        document.getElementById("achievementDate").value =
          draft.achievementDate;
      if (draft.awardingBody)
        document.getElementById("awardingBody").value = draft.awardingBody;
      if (draft.level) document.getElementById("level").value = draft.level;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.eventName)
        document.getElementById("eventName").value = draft.eventName;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.outcomes)
        document.getElementById("outcomes").value = draft.outcomes;
      if (draft.videoLink)
        document.getElementById("videoLink").value = draft.videoLink;
      if (draft.tags) document.getElementById("tags").value = draft.tags;
      if (draft.department)
        document.getElementById("department").value = draft.department;
      if (draft.recipientNames)
        document.getElementById("recipientNames").value = draft.recipientNames;

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

  // Character counter for short summary
  const shortSummary = document.getElementById("shortSummary");
  const summaryCharCount = document.getElementById("summaryCharCount");

  if (shortSummary && summaryCharCount) {
    shortSummary.addEventListener("input", function () {
      const charCount = this.value.length;
      summaryCharCount.textContent = charCount;
    });
  }

  // Date validation - ensure achievement date is not in the future
  const achievementDateInput = document.getElementById("achievementDate");

  if (achievementDateInput) {
    // Set max date to today
    const today = new Date().toISOString().split("T")[0];
    achievementDateInput.max = today;

    achievementDateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        alert("Achievement date cannot be in the future.");
        this.value = "";
      }
    });
  }
});
