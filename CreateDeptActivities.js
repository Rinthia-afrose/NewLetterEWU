// Create Department Activities JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize form elements
  const form = document.getElementById("createDeptActivityForm");
  const shortSummary = document.getElementById("shortSummary");
  const summaryCharCount = document.getElementById("summaryCharCount");

  // Character counter for short summary
  if (shortSummary && summaryCharCount) {
    shortSummary.addEventListener("input", function () {
      const currentLength = shortSummary.value.length;
      summaryCharCount.textContent = currentLength;

      // Change color when approaching limit
      if (currentLength > 180) {
        summaryCharCount.style.color = "#dc3545";
      } else {
        summaryCharCount.style.color = "#6c757d";
      }
    });
  }

  // Form submission handling
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      if (validateForm()) {
        // In a real application, this would send data to a server
        alert("Department activity submitted for review!");
        form.reset();
        if (summaryCharCount) {
          summaryCharCount.textContent = "0";
        }
      }
    });

    // Draft save handling
    const draftBtn = form.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const departmentName = document.getElementById("departmentName").value;
        const activityTitle = document.getElementById("activityTitle").value;
        const activityType = document.getElementById("activityType").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const venue = document.getElementById("venue").value;
        const organizers = document.getElementById("organizers").value;
        const collaborators = document.getElementById("collaborators").value;
        const shortSummary = document.getElementById("shortSummary").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const objectives = document.getElementById("objectives").value;
        const activityFlow = document.getElementById("activityFlow").value;
        const participationDetails = document.getElementById(
          "participationDetails"
        ).value;
        const results = document.getElementById("results").value;
        const futurePlans = document.getElementById("futurePlans").value;
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
          type: "deptActivity",
          departmentName: departmentName,
          activityTitle: activityTitle,
          activityType: activityType,
          startDate: startDate,
          endDate: endDate,
          venue: venue,
          organizers: organizers,
          collaborators: collaborators,
          shortSummary: shortSummary,
          fullArticle: fullArticle,
          objectives: objectives,
          activityFlow: activityFlow,
          participationDetails: participationDetails,
          results: results,
          futurePlans: futurePlans,
          videoLink: videoLink,
          tags: tags,
          audience: audience,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Department activity saved as draft successfully!");
        window.location.href = "drafts.html";
      });

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
          if (draft.departmentName)
            document.getElementById("departmentName").value =
              draft.departmentName;
          if (draft.activityTitle)
            document.getElementById("activityTitle").value =
              draft.activityTitle;
          if (draft.activityType)
            document.getElementById("activityType").value = draft.activityType;
          if (draft.startDate)
            document.getElementById("startDate").value = draft.startDate;
          if (draft.endDate)
            document.getElementById("endDate").value = draft.endDate;
          if (draft.venue) document.getElementById("venue").value = draft.venue;
          if (draft.organizers)
            document.getElementById("organizers").value = draft.organizers;
          if (draft.collaborators)
            document.getElementById("collaborators").value =
              draft.collaborators;
          if (draft.shortSummary)
            document.getElementById("shortSummary").value = draft.shortSummary;
          if (draft.fullArticle)
            document.getElementById("fullArticle").value = draft.fullArticle;
          if (draft.objectives)
            document.getElementById("objectives").value = draft.objectives;
          if (draft.activityFlow)
            document.getElementById("activityFlow").value = draft.activityFlow;
          if (draft.participationDetails)
            document.getElementById("participationDetails").value =
              draft.participationDetails;
          if (draft.results)
            document.getElementById("results").value = draft.results;
          if (draft.futurePlans)
            document.getElementById("futurePlans").value = draft.futurePlans;
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
  }

  // Form validation function
  function validateForm() {
    const requiredFields = [
      "departmentName",
      "activityTitle",
      "activityType",
      "startDate",
      "venue",
      "organizers",
      "shortSummary",
      "fullArticle",
    ];

    let isValid = true;

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field) {
        if (!field.value.trim()) {
          field.classList.add("is-invalid");
          isValid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      }
    });

    // Special validation for date range
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    if (
      startDate &&
      endDate &&
      endDate.value &&
      new Date(endDate.value) < new Date(startDate.value)
    ) {
      endDate.classList.add("is-invalid");
      alert("End date must be after start date");
      isValid = false;
    } else if (endDate) {
      endDate.classList.remove("is-invalid");
    }

    if (!isValid) {
      alert("Please fill in all required fields.");
    }

    return isValid;
  }

  // Add event listeners to remove invalid class on input
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
  });
});
