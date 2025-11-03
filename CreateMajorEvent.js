// Create Major Event Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create event page

  // Form submission handling
  const createEventForm = document.getElementById("createEventForm");

  if (createEventForm) {
    createEventForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("eventTitle").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const location = document.getElementById("location").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (!title || !startDate || !endDate || !location || !fullArticle) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // Check if end date is after start date
      if (new Date(endDate) < new Date(startDate)) {
        alert("End date must be after start date.");
        return;
      }

      // If validation passes, show success message
      alert("Event submitted for review successfully!");

      // Prepare data for saving
      const eventData = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        location: location,
        organizers: document.getElementById("organizers").value,
        shortSummary: document.getElementById("shortSummary").value,
        fullArticle: fullArticle,
        highlights: document.getElementById("highlights").value,
        outcomes: document.getElementById("outcomes").value,
        videoLink: document.getElementById("videoLink").value,
        participation: document.getElementById("participation").value,
        tags: document.getElementById("tags").value,
        audience:
          document.querySelector('input[name="audience"]:checked')?.value || "",
      };

      // Save to under review submissions
      if (typeof saveSubmittedContent === "function") {
        saveSubmittedContent(eventData, "majorEvent");
      }

      // Reset form after submission
      createEventForm.reset();
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const title = document.getElementById("eventTitle").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const location = document.getElementById("location").value;
        const organizers = document.getElementById("organizers").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const highlights = document.getElementById("highlights").value;
        const outcomes = document.getElementById("outcomes").value;
        const videoLink = document.getElementById("videoLink").value;
        const participation = document.getElementById("participation").value;
        const tags = document.getElementById("tags").value;

        // Get selected audience
        const audience = document.querySelector(
          'input[name="audience"]:checked'
        );
        const audienceValue = audience ? audience.value : "";

        // Create draft object
        const draft = {
          type: "majorEvent",
          title: title,
          startDate: startDate,
          endDate: endDate,
          location: location,
          organizers: organizers,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          highlights: highlights,
          outcomes: outcomes,
          videoLink: videoLink,
          participation: participation,
          tags: tags,
          audience: audienceValue,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Event saved as draft successfully!");
        window.location.href = "drafts.html";
      });
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
          document.getElementById("eventTitle").value = draft.title;
        if (draft.startDate)
          document.getElementById("startDate").value = draft.startDate;
        if (draft.endDate)
          document.getElementById("endDate").value = draft.endDate;
        if (draft.location)
          document.getElementById("location").value = draft.location;
        if (draft.organizers)
          document.getElementById("organizers").value = draft.organizers;
        if (draft.shortSummary)
          document.getElementById("shortSummary").value = draft.shortSummary;
        if (draft.fullArticle)
          document.getElementById("fullArticle").value = draft.fullArticle;
        if (draft.highlights)
          document.getElementById("highlights").value = draft.highlights;
        if (draft.outcomes)
          document.getElementById("outcomes").value = draft.outcomes;
        if (draft.videoLink)
          document.getElementById("videoLink").value = draft.videoLink;
        if (draft.participation)
          document.getElementById("participation").value = draft.participation;
        if (draft.tags) document.getElementById("tags").value = draft.tags;
        if (draft.audience) {
          const audienceRadio = document.querySelector(
            `input[name="audience"][value="${draft.audience}"]`
          );
          if (audienceRadio) audienceRadio.checked = true;
        }
      }
    }
  }

  // Date validation - ensure end date is after start date
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (startDateInput && endDateInput) {
    startDateInput.addEventListener("change", function () {
      if (
        endDateInput.value &&
        new Date(endDateInput.value) < new Date(this.value)
      ) {
        endDateInput.value = this.value;
      }
      endDateInput.min = this.value;
    });

    endDateInput.addEventListener("change", function () {
      if (
        startDateInput.value &&
        new Date(this.value) < new Date(startDateInput.value)
      ) {
        alert("End date cannot be before start date.");
        this.value = startDateInput.value;
      }
    });
  }
});
