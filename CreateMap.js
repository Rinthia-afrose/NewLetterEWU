// Character counter for short summary
document.addEventListener("DOMContentLoaded", function () {
  const summaryInput = document.getElementById("shortSummary");
  const charCount = document.getElementById("summaryCharCount");

  if (summaryInput && charCount) {
    summaryInput.addEventListener("input", function () {
      const currentLength = this.value.length;
      charCount.textContent = currentLength;

      // Change color when approaching limit
      if (currentLength > 180) {
        charCount.style.color = "#dc3545";
      } else if (currentLength > 150) {
        charCount.style.color = "#ffc107";
      } else {
        charCount.style.color = "#6c757d";
      }
    });
  }

  // Form submission handler
  const form = document.getElementById("createMapForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("mapTitle").value;
      const location = document.getElementById("location").value;
      const updateDate = document.getElementById("updateDate").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      if (!title || !location || !updateDate || !shortSummary || !fullArticle) {
        alert("Please fill in all required fields.");
        return;
      }

      // If validation passes, show success message
      alert("Map article submitted for review!");
      // Here you would typically send the data to your server
      // form.submit(); // Uncomment to actually submit the form
    });

    // Draft save handling
    const draftBtn = form.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const mapTitle = document.getElementById("mapTitle").value;
        const location = document.getElementById("location").value;
        const updateType = document.getElementById("updateType").value;
        const updateDate = document.getElementById("updateDate").value;
        const responsibleOffice =
          document.getElementById("responsibleOffice").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const objectives = document.getElementById("objectives").value;
        const keyFeatures = document.getElementById("keyFeatures").value;
        const impact = document.getElementById("impact").value;
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
          type: "map",
          mapTitle: mapTitle,
          location: location,
          updateType: updateType,
          updateDate: updateDate,
          responsibleOffice: responsibleOffice,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          objectives: objectives,
          keyFeatures: keyFeatures,
          impact: impact,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Map article saved as draft successfully!");
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
      if (draft.mapTitle)
        document.getElementById("mapTitle").value = draft.mapTitle;
      if (draft.location)
        document.getElementById("location").value = draft.location;
      if (draft.updateType)
        document.getElementById("updateType").value = draft.updateType;
      if (draft.updateDate)
        document.getElementById("updateDate").value = draft.updateDate;
      if (draft.responsibleOffice)
        document.getElementById("responsibleOffice").value =
          draft.responsibleOffice;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.keyFeatures)
        document.getElementById("keyFeatures").value = draft.keyFeatures;
      if (draft.impact) document.getElementById("impact").value = draft.impact;
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
});
