// CreateTrainingProgram.js
// Training Program Creation Page Functionality

document.addEventListener("DOMContentLoaded", function () {
  // Character counter for short summary
  const shortSummary = document.getElementById("shortSummary");
  const summaryCharCount = document.getElementById("summaryCharCount");

  if (shortSummary && summaryCharCount) {
    shortSummary.addEventListener("input", function () {
      const currentLength = shortSummary.value.length;
      summaryCharCount.textContent = currentLength;

      // Change color if approaching limit
      if (currentLength > 180) {
        summaryCharCount.style.color = "#dc3545";
      } else {
        summaryCharCount.style.color = "#0d2747";
      }
    });
  }

  // Training type selection and skill dropdowns
  const trainingType = document.getElementById("trainingType");
  const skills = document.getElementById("skills");

  // Define skills for each training type
  const skillsData = {
    technical: [
      { value: "it", text: "IT" },
      { value: "engineering", text: "Engineering" },
      { value: "coding", text: "Coding" },
      { value: "robotics", text: "Robotics" },
    ],
    soft: [
      { value: "communication", text: "Communication" },
      { value: "leadership", text: "Leadership" },
      { value: "teamwork", text: "Teamwork" },
    ],
    career: [
      { value: "cv", text: "CV Writing" },
      { value: "interview", text: "Interview Skills" },
      { value: "placement", text: "Job Placement" },
    ],
    research: [
      { value: "spss", text: "SPSS" },
      { value: "data", text: "Data Analysis" },
      { value: "lab", text: "Lab Techniques" },
    ],
    certification: [
      { value: "acca", text: "ACCA" },
      { value: "project", text: "Project Management" },
      { value: "other", text: "Other Certifications" },
    ],
  };

  if (trainingType && skills) {
    trainingType.addEventListener("change", function () {
      // Reset skills dropdown
      resetSkillsDropdown();

      // Populate skills dropdown based on training type
      if (this.value && skillsData[this.value]) {
        skills.disabled = false;

        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Skills";
        skills.appendChild(defaultOption);

        // Add skills options
        skillsData[this.value].forEach((skill) => {
          const option = document.createElement("option");
          option.value = skill.value;
          option.textContent = skill.text;
          skills.appendChild(option);
        });
      }
    });
  }

  // Function to reset skills dropdown
  function resetSkillsDropdown() {
    if (skills) {
      skills.innerHTML = "";
      skills.disabled = true;
    }
  }

  // Form submission
  const createTrainingProgramForm = document.getElementById(
    "createTrainingProgramForm"
  );
  if (createTrainingProgramForm) {
    createTrainingProgramForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      if (validateForm()) {
        // In a real application, this would send data to a server
        alert("Training program submitted for review!");
        // Reset form after submission
        createTrainingProgramForm.reset();
        // Reset skill dropdowns
        resetSkillsDropdown();
        // Reset character counter
        if (summaryCharCount) summaryCharCount.textContent = "0";
      }
    });
  }

  // Draft save functionality
  const draftBtn = document.querySelector(".draft-btn");
  if (draftBtn) {
    draftBtn.addEventListener("click", function () {
      // Get form data
      const programTitle = document.getElementById("programTitle").value;
      const trainingType = document.getElementById("trainingType").value;
      const skills = document.getElementById("skills").value;
      const organizers = document.getElementById("organizers").value;
      const trainers = document.getElementById("trainers").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const duration = document.getElementById("duration").value;
      const locationMode = document.getElementById("locationMode").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;
      const objectives = document.getElementById("objectives").value;
      const curriculum = document.getElementById("curriculum").value;
      const participation = document.getElementById("participation").value;
      const outcomes = document.getElementById("outcomes").value;
      const feedback = document.getElementById("feedback").value;
      const videoLink = document.getElementById("videoLink").value;
      const tags = document.getElementById("tags").value;
      const certificationProvided = document.getElementById(
        "certificationProvided"
      ).value;

      // Get selected audience
      const audience = [];
      document
        .querySelectorAll('input[type="checkbox"]:checked')
        .forEach((checkbox) => {
          audience.push(checkbox.value);
        });

      // Create draft object
      const draft = {
        type: "trainingProgram",
        programTitle: programTitle,
        trainingType: trainingType,
        skills: skills,
        organizers: organizers,
        trainers: trainers,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        locationMode: locationMode,
        shortSummary: shortSummary,
        fullArticle: fullArticle,
        objectives: objectives,
        curriculum: curriculum,
        participation: participation,
        outcomes: outcomes,
        feedback: feedback,
        videoLink: videoLink,
        tags: tags,
        certificationProvided: certificationProvided,
        audience: audience,
        date: new Date().toISOString(),
      };

      // Save draft to localStorage
      saveDraft(draft);

      // Show success message and redirect to drafts page
      alert("Training program saved as draft successfully!");
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
      if (draft.programTitle)
        document.getElementById("programTitle").value = draft.programTitle;
      if (draft.trainingType)
        document.getElementById("trainingType").value = draft.trainingType;
      if (draft.skills) document.getElementById("skills").value = draft.skills;
      if (draft.organizers)
        document.getElementById("organizers").value = draft.organizers;
      if (draft.trainers)
        document.getElementById("trainers").value = draft.trainers;
      if (draft.startDate)
        document.getElementById("startDate").value = draft.startDate;
      if (draft.endDate)
        document.getElementById("endDate").value = draft.endDate;
      if (draft.duration)
        document.getElementById("duration").value = draft.duration;
      if (draft.locationMode)
        document.getElementById("locationMode").value = draft.locationMode;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.objectives)
        document.getElementById("objectives").value = draft.objectives;
      if (draft.curriculum)
        document.getElementById("curriculum").value = draft.curriculum;
      if (draft.participation)
        document.getElementById("participation").value = draft.participation;
      if (draft.outcomes)
        document.getElementById("outcomes").value = draft.outcomes;
      if (draft.feedback)
        document.getElementById("feedback").value = draft.feedback;
      if (draft.videoLink)
        document.getElementById("videoLink").value = draft.videoLink;
      if (draft.tags) document.getElementById("tags").value = draft.tags;
      if (draft.certificationProvided)
        document.getElementById("certificationProvided").value =
          draft.certificationProvided;

      // Set audience checkboxes
      if (draft.audience && Array.isArray(draft.audience)) {
        draft.audience.forEach((value) => {
          const checkbox = document.querySelector(
            `input[type="checkbox"][value="${value}"]`
          );
          if (checkbox) checkbox.checked = true;
        });
      }

      // Handle skills dropdown based on training type
      if (draft.trainingType && skillsData[draft.trainingType]) {
        // Enable skills dropdown
        const skills = document.getElementById("skills");
        if (skills) {
          skills.disabled = false;

          // Clear existing options
          skills.innerHTML = "";

          // Add default option
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = "Select Skills";
          skills.appendChild(defaultOption);

          // Add skills options
          skillsData[draft.trainingType].forEach((skill) => {
            const option = document.createElement("option");
            option.value = skill.value;
            option.textContent = skill.text;
            if (skill.value === draft.skills) {
              option.selected = true;
            }
            skills.appendChild(option);
          });
        }
      }
    }
  }

  // Form validation function
  function validateForm() {
    let isValid = true;

    // Check required fields
    const requiredFields = [
      "programTitle",
      "trainingType",
      "organizers",
      "startDate",
      "endDate",
      "locationMode",
      "shortSummary",
      "fullArticle",
    ];

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field && !field.value.trim()) {
        isValid = false;
        field.classList.add("is-invalid");
        // Add error message
        if (
          !field.nextElementSibling ||
          !field.nextElementSibling.classList.contains("invalid-feedback")
        ) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "invalid-feedback";
          errorDiv.textContent = "This field is required.";
          field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
      } else if (field) {
        field.classList.remove("is-invalid");
        // Remove error message if it exists
        if (
          field.nextElementSibling &&
          field.nextElementSibling.classList.contains("invalid-feedback")
        ) {
          field.nextElementSibling.remove();
        }
      }
    });

    // Check if start date is before end date
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    if (startDate && endDate && startDate.value && endDate.value) {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);

      if (start > end) {
        isValid = false;
        endDate.classList.add("is-invalid");
        // Add error message
        if (
          !endDate.nextElementSibling ||
          !endDate.nextElementSibling.classList.contains("invalid-feedback")
        ) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "invalid-feedback";
          errorDiv.textContent = "End date must be after start date.";
          endDate.parentNode.insertBefore(errorDiv, endDate.nextSibling);
        }
      } else {
        endDate.classList.remove("is-invalid");
        // Remove error message if it exists
        if (
          endDate.nextElementSibling &&
          endDate.nextElementSibling.classList.contains("invalid-feedback")
        ) {
          endDate.nextElementSibling.remove();
        }
      }
    }

    // Check character limit for short summary
    const summary = document.getElementById("shortSummary");
    if (summary && summary.value.length > 200) {
      isValid = false;
      summary.classList.add("is-invalid");
      // Add error message
      if (
        !summary.nextElementSibling ||
        !summary.nextElementSibling.classList.contains("invalid-feedback")
      ) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "invalid-feedback";
        errorDiv.textContent = "Summary must be 200 characters or less.";
        summary.parentNode.insertBefore(errorDiv, summary.nextSibling);
      }
    } else if (summary) {
      summary.classList.remove("is-invalid");
      // Remove error message if it exists
      if (
        summary.nextElementSibling &&
        summary.nextElementSibling.classList.contains("invalid-feedback")
      ) {
        summary.nextElementSibling.remove();
      }
    }

    return isValid;
  }

  // Add event listeners to remove validation errors when user starts typing
  const formFields = document.querySelectorAll(
    "#createTrainingProgramForm input, #createTrainingProgramForm textarea, #createTrainingProgramForm select"
  );
  formFields.forEach((field) => {
    field.addEventListener("input", function () {
      this.classList.remove("is-invalid");
      if (
        this.nextElementSibling &&
        this.nextElementSibling.classList.contains("invalid-feedback")
      ) {
        this.nextElementSibling.remove();
      }
    });
  });
});
