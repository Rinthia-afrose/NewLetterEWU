// Create Library Article Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create library page

  // Form submission handling
  const createLibraryForm = document.getElementById("createLibraryForm");

  if (createLibraryForm) {
    createLibraryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("title").value;
      const typeOfUpdate = document.getElementById("typeOfUpdate").value;
      const date = document.getElementById("date").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (!title || !typeOfUpdate || !date || !shortSummary || !fullArticle) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // If validation passes, show success message
      alert("Library article submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createLibraryForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const title = document.getElementById("title").value;
        const typeOfUpdate = document.getElementById("typeOfUpdate").value;
        const date = document.getElementById("date").value;
        const location = document.getElementById("location").value;
        const organizers = document.getElementById("organizers").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const objectives = document.getElementById("objectives").value;
        const outcomes = document.getElementById("outcomes").value;
        const guests = document.getElementById("guests").value;
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
          type: "library",
          title: title,
          typeOfUpdate: typeOfUpdate,
          date: date,
          location: location,
          organizers: organizers,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          objectives: objectives,
          outcomes: outcomes,
          guests: guests,
          videoLink: videoLink,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Library article saved as draft successfully!");
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
        if (draft.title) document.getElementById("title").value = draft.title;
        if (draft.typeOfUpdate)
          document.getElementById("typeOfUpdate").value = draft.typeOfUpdate;
        if (draft.date) document.getElementById("date").value = draft.date;
        if (draft.location)
          document.getElementById("location").value = draft.location;
        if (draft.organizers)
          document.getElementById("organizers").value = draft.organizers;
        if (draft.shortSummary)
          document.getElementById("shortSummary").value = draft.shortSummary;
        if (draft.fullArticle)
          document.getElementById("fullArticle").value = draft.fullArticle;
        if (draft.objectives)
          document.getElementById("objectives").value = draft.objectives;
        if (draft.outcomes)
          document.getElementById("outcomes").value = draft.outcomes;
        if (draft.guests)
          document.getElementById("guests").value = draft.guests;
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
  }

  // Date validation
  const dateInput = document.getElementById("date");

  if (dateInput) {
    // Set max date to today
    dateInput.max = new Date().toISOString().split("T")[0];

    // Ensure selected date is not in the future
    dateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        alert("Date cannot be in the future.");
        this.value = "";
      }
    });
  }
});
