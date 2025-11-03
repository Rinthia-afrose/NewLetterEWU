// Create Recreation Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded for Create Recreation page");

  // Form submission handling
  const createRecreationForm = document.getElementById("createRecreationForm");
  if (createRecreationForm) {
    createRecreationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Form submitted");

      // Get form data
      const formData = new FormData(createRecreationForm);

      // Log form data for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Here you would typically send the data to a server
      // For now, we'll just show an alert
      alert("Recreation article submitted for review!");

      // Reset form after submission
      createRecreationForm.reset();
    });
  }

  // Draft button handling
  const draftBtn = document.querySelector(".draft-btn");
  if (draftBtn) {
    draftBtn.addEventListener("click", function () {
      // Get form data
      const activityTitle = document.getElementById("activityTitle").value;
      const activityType = document.getElementById("activityType").value;
      const dates = document.getElementById("dates").value;
      const venue = document.getElementById("venue").value;
      const organizers = document.getElementById("organizers").value;
      const specialGuests = document.getElementById("specialGuests").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;
      const objectives = document.getElementById("objectives").value;
      const participationDetails = document.getElementById(
        "participationDetails"
      ).value;
      const results = document.getElementById("results").value;
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
        type: "recreation",
        activityTitle: activityTitle,
        activityType: activityType,
        dates: dates,
        venue: venue,
        organizers: organizers,
        specialGuests: specialGuests,
        shortSummary: shortSummary,
        fullArticle: fullArticle,
        objectives: objectives,
        participationDetails: participationDetails,
        results: results,
        impact: impact,
        videoLink: videoLink,
        tags: tags,
        audience: audience,
        date: new Date().toISOString(),
      };

      // Save draft to localStorage
      saveDraft(draft);

      // Show success message and redirect to drafts page
      alert("Recreation article saved as draft successfully!");
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
      if (draft.activityTitle)
        document.getElementById("activityTitle").value = draft.activityTitle;
      if (draft.activityType)
        document.getElementById("activityType").value = draft.activityType;
      if (draft.dates) document.getElementById("dates").value = draft.dates;
      if (draft.venue) document.getElementById("venue").value = draft.venue;
      if (draft.organizers)
        document.getElementById("organizers").value = draft.organizers;
      if (draft.specialGuests)
        document.getElementById("specialGuests").value = draft.specialGuests;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.participationDetails)
        document.getElementById("participationDetails").value =
          draft.participationDetails;
      if (draft.results)
        document.getElementById("results").value = draft.results;
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
});
