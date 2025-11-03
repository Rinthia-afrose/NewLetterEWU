// Create Seminar Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create seminar page

  // Form submission handling
  const createSeminarForm = document.getElementById("createSeminarForm");

  if (createSeminarForm) {
    createSeminarForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("seminarTitle").value;
      const date = document.getElementById("seminarDate").value;
      const time = document.getElementById("seminarTime").value;
      const venue = document.getElementById("venue").value;
      const organizer = document.getElementById("organizer").value;
      const seminarType = document.getElementById("seminarType").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;

      // Check required fields
      if (
        !title ||
        !date ||
        !time ||
        !venue ||
        !organizer ||
        !seminarType ||
        !shortSummary ||
        !fullArticle
      ) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // If validation passes, show success message
      alert("Seminar submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createSeminarForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const seminarTitle = document.getElementById("seminarTitle").value;
        const seminarDate = document.getElementById("seminarDate").value;
        const seminarTime = document.getElementById("seminarTime").value;
        const venue = document.getElementById("venue").value;
        const organizer = document.getElementById("organizer").value;
        const seminarType = document.getElementById("seminarType").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const objectives = document.getElementById("objectives").value;
        const discussionPoints =
          document.getElementById("discussionPoints").value;
        const outcomes = document.getElementById("outcomes").value;
        const participants = document.getElementById("participants").value;
        const videoLink = document.getElementById("videoLink").value;
        const tags = document.getElementById("tags").value;

        // Get speaker data
        const speakers = [];
        const speakerEntries = document.querySelectorAll(".speaker-entry");
        speakerEntries.forEach((entry) => {
          const name = entry.querySelector(".speaker-name").value;
          const designation = entry.querySelector(".speaker-designation").value;
          const affiliation = entry.querySelector(".speaker-affiliation").value;

          if (name || designation || affiliation) {
            speakers.push({ name, designation, affiliation });
          }
        });

        // Get selected audience
        const audience = [];
        document
          .querySelectorAll('input[type="checkbox"]:checked')
          .forEach((checkbox) => {
            audience.push(checkbox.value);
          });

        // Create draft object
        const draft = {
          type: "seminar",
          seminarTitle: seminarTitle,
          seminarDate: seminarDate,
          seminarTime: seminarTime,
          venue: venue,
          organizer: organizer,
          seminarType: seminarType,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          objectives: objectives,
          discussionPoints: discussionPoints,
          outcomes: outcomes,
          participants: participants,
          videoLink: videoLink,
          tags: tags,
          speakers: speakers,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Seminar saved as draft successfully!");
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
      if (draft.seminarTitle)
        document.getElementById("seminarTitle").value = draft.seminarTitle;
      if (draft.seminarDate)
        document.getElementById("seminarDate").value = draft.seminarDate;
      if (draft.seminarTime)
        document.getElementById("seminarTime").value = draft.seminarTime;
      if (draft.venue) document.getElementById("venue").value = draft.venue;
      if (draft.organizer)
        document.getElementById("organizer").value = draft.organizer;
      if (draft.seminarType)
        document.getElementById("seminarType").value = draft.seminarType;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.discussionPoints)
        document.getElementById("discussionPoints").value =
          draft.discussionPoints;
      if (draft.outcomes)
        document.getElementById("outcomes").value = draft.outcomes;
      if (draft.participants)
        document.getElementById("participants").value = draft.participants;
      if (draft.videoLink)
        document.getElementById("videoLink").value = draft.videoLink;
      if (draft.tags) document.getElementById("tags").value = draft.tags;

      // Set speaker data
      if (
        draft.speakers &&
        Array.isArray(draft.speakers) &&
        draft.speakers.length > 0
      ) {
        const speakersContainer = document.getElementById("speakers-container");
        // Clear existing speakers except the first one
        while (speakersContainer.children.length > 1) {
          speakersContainer.removeChild(speakersContainer.lastChild);
        }

        // Update the first speaker entry
        const firstSpeakerEntry =
          speakersContainer.querySelector(".speaker-entry");
        if (firstSpeakerEntry && draft.speakers.length > 0) {
          const firstSpeaker = draft.speakers[0];
          firstSpeakerEntry.querySelector(".speaker-name").value =
            firstSpeaker.name || "";
          firstSpeakerEntry.querySelector(".speaker-designation").value =
            firstSpeaker.designation || "";
          firstSpeakerEntry.querySelector(".speaker-affiliation").value =
            firstSpeaker.affiliation || "";
        }

        // Add additional speaker entries
        for (let i = 1; i < draft.speakers.length; i++) {
          const speaker = draft.speakers[i];
          const speakerEntry = document.createElement("div");
          speakerEntry.className = "speaker-entry mb-3";
          speakerEntry.innerHTML = `
            <div class="row">
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control speaker-name" placeholder="Name" value="${
                  speaker.name || ""
                }">
              </div>
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control speaker-designation" placeholder="Designation" value="${
                  speaker.designation || ""
                }">
              </div>
              <div class="col-md-4 mb-2">
                <input type="text" class="form-control speaker-affiliation" placeholder="Affiliation" value="${
                  speaker.affiliation || ""
                }">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-end">
                <button type="button" class="btn btn-outline-danger btn-sm remove-speaker">
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          `;
          speakersContainer.appendChild(speakerEntry);

          // Add event listener to the remove button
          const removeBtn = speakerEntry.querySelector(".remove-speaker");
          removeBtn.addEventListener("click", function () {
            speakersContainer.removeChild(speakerEntry);
          });
        }
      }

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

  // Add speaker button functionality
  const addSpeakerBtn = document.getElementById("add-speaker");
  const speakersContainer = document.getElementById("speakers-container");

  if (addSpeakerBtn && speakersContainer) {
    addSpeakerBtn.addEventListener("click", function () {
      const speakerEntry = document.createElement("div");
      speakerEntry.className = "speaker-entry mb-3";
      speakerEntry.innerHTML = `
        <div class="row">
          <div class="col-md-4 mb-2">
            <input type="text" class="form-control speaker-name" placeholder="Name">
          </div>
          <div class="col-md-4 mb-2">
            <input type="text" class="form-control speaker-designation" placeholder="Designation">
          </div>
          <div class="col-md-4 mb-2">
            <input type="text" class="form-control speaker-affiliation" placeholder="Affiliation">
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-end">
            <button type="button" class="btn btn-outline-danger btn-sm remove-speaker">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
        </div>
      `;
      speakersContainer.appendChild(speakerEntry);

      // Add event listener to the remove button of the new speaker entry
      const removeBtn = speakerEntry.querySelector(".remove-speaker");
      removeBtn.addEventListener("click", function () {
        speakersContainer.removeChild(speakerEntry);
      });
    });

    // Add event listeners to existing remove buttons (if any)
    const removeButtons = document.querySelectorAll(".remove-speaker");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const speakerEntry = this.closest(".speaker-entry");
        speakersContainer.removeChild(speakerEntry);
      });
    });
  }

  // Character counter for short summary
  const shortSummary = document.getElementById("shortSummary");
  const charCount = document.getElementById("summary-char-count");

  if (shortSummary && charCount) {
    shortSummary.addEventListener("input", function () {
      const currentLength = this.value.length;
      charCount.textContent = currentLength;

      // Optional: Change color when approaching limit
      if (currentLength > 180) {
        charCount.style.color = "#dc3545"; // Red color when close to limit
      } else {
        charCount.style.color = ""; // Reset to default color
      }
    });
  }
});
