// Create Others Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create others page

  // Character counter for short summary
  const shortSummary = document.getElementById("shortSummary");
  const summaryCharCount = document.getElementById("summaryCharCount");

  if (shortSummary && summaryCharCount) {
    shortSummary.addEventListener("input", function () {
      const currentLength = this.value.length;
      summaryCharCount.textContent = currentLength;

      // Optional: Change color when approaching limit
      if (currentLength > 180) {
        summaryCharCount.style.color = "#dc3545";
      } else {
        summaryCharCount.style.color = "";
      }
    });
  }

  // Form submission handling
  const createOthersForm = document.getElementById("createOthersForm");

  if (createOthersForm) {
    createOthersForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("articleTitle").value;
      const category = document.getElementById("categoryType").value;
      const date = document.getElementById("articleDate").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (!title || !category || !date || !shortSummary || !fullArticle) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // Check summary length
      if (shortSummary.length < 150 || shortSummary.length > 200) {
        alert("Short summary must be between 150 and 200 characters.");
        return;
      }

      // If validation passes, show success message
      alert("Article submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createOthersForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const articleTitle = document.getElementById("articleTitle").value;
        const categoryType = document.getElementById("categoryType").value;
        const articleDate = document.getElementById("articleDate").value;
        const organizer = document.getElementById("organizer").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const objectives = document.getElementById("objectives").value;
        const keyDetails = document.getElementById("keyDetails").value;
        const impact = document.getElementById("impact").value;
        const videoLink = document.getElementById("videoLink").value;
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
          type: "other",
          articleTitle: articleTitle,
          categoryType: categoryType,
          articleDate: articleDate,
          organizer: organizer,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          objectives: objectives,
          keyDetails: keyDetails,
          impact: impact,
          videoLink: videoLink,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Article saved as draft successfully!");
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
      if (draft.articleTitle)
        document.getElementById("articleTitle").value = draft.articleTitle;
      if (draft.categoryType)
        document.getElementById("categoryType").value = draft.categoryType;
      if (draft.articleDate)
        document.getElementById("articleDate").value = draft.articleDate;
      if (draft.organizer)
        document.getElementById("organizer").value = draft.organizer;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.keyDetails)
        document.getElementById("keyDetails").value = draft.keyDetails;
      if (draft.impact) document.getElementById("impact").value = draft.impact;
      if (draft.videoLink)
        document.getElementById("videoLink").value = draft.videoLink;
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

  // Date validation - set max date to today
  const articleDateInput = document.getElementById("articleDate");
  if (articleDateInput) {
    // Set max date to today
    const today = new Date().toISOString().split("T")[0];
    articleDateInput.max = today;
  }
});
