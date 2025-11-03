// Create CCC Events Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "loginPage.html";
  }

  // Initialize any specific functionality for the create CCC event page

  // Form submission handling
  const createEventForm = document.getElementById("createCCCEventForm");

  if (createEventForm) {
    createEventForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("eventTitle").value;
      const eventDates = document.getElementById("eventDates").value;
      const venue = document.getElementById("venue").value;
      const shortSummary = document.getElementById("shortSummary").value;

      // Check required fields
      if (!title || !eventDates || !venue || !shortSummary) {
        alert("Please fill in all required fields (marked with *).");
        return;
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
          if (draft.eventDates)
            document.getElementById("eventDates").value = draft.eventDates;
          if (draft.eventTime)
            document.getElementById("eventTime").value = draft.eventTime;
          if (draft.venue) document.getElementById("venue").value = draft.venue;
          if (draft.organizer)
            document.getElementById("organizer").value = draft.organizer;
          if (draft.guests)
            document.getElementById("guests").value = draft.guests;
          if (draft.careerFocus)
            document.getElementById("careerFocus").value = draft.careerFocus;
          if (draft.shortSummary)
            document.getElementById("shortSummary").value = draft.shortSummary;
          if (draft.fullArticle)
            document.getElementById("fullArticle").value = draft.fullArticle;
          if (draft.keyLearnings)
            document.getElementById("keyLearnings").value = draft.keyLearnings;
          if (draft.outcomes)
            document.getElementById("outcomes").value = draft.outcomes;
          if (draft.videoLink)
            document.getElementById("videoLink").value = draft.videoLink;
          if (draft.tags) document.getElementById("tags").value = draft.tags;

          // Set audience checkboxes
          if (draft.audience && Array.isArray(draft.audience)) {
            draft.audience.forEach((value) => {
              const checkbox = document.querySelector(
                `input[name="audience"][value="${value}"]`
              );
              if (checkbox) checkbox.checked = true;
            });
          }
        }
      }

      // If validation passes, show success message
      alert("CCC Event submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createEventForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const title = document.getElementById("eventTitle").value;
        const eventDates = document.getElementById("eventDates").value;
        const eventTime = document.getElementById("eventTime").value;
        const venue = document.getElementById("venue").value;
        const organizer = document.getElementById("organizer").value;
        const guests = document.getElementById("guests").value;
        const careerFocus = document.getElementById("careerFocus").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const keyLearnings = document.getElementById("keyLearnings").value;
        const outcomes = document.getElementById("outcomes").value;
        const videoLink = document.getElementById("videoLink").value;
        const tags = document.getElementById("tags").value;

        // Get selected audience
        const audience = [];
        document
          .querySelectorAll('input[name="audience"]:checked')
          .forEach((checkbox) => {
            audience.push(checkbox.value);
          });

        // Create draft object
        const draft = {
          type: "cccEvent",
          title: title,
          eventDates: eventDates,
          eventTime: eventTime,
          venue: venue,
          organizer: organizer,
          guests: guests,
          careerFocus: careerFocus,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          keyLearnings: keyLearnings,
          outcomes: outcomes,
          videoLink: videoLink,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("CCC Event saved as draft successfully!");
        window.location.href = "drafts.html";
      });
    }
  }
});
