document.addEventListener("DOMContentLoaded", function () {
  // Character counter for short summary
  const shortSummary = document.getElementById("shortSummary");
  const summaryCharCount = document.getElementById("summaryCharCount");

  if (shortSummary && summaryCharCount) {
    shortSummary.addEventListener("input", function () {
      const currentLength = shortSummary.value.length;
      summaryCharCount.textContent = currentLength;

      // Optional: Change color when approaching limit
      if (currentLength > 180) {
        summaryCharCount.style.color = "#dc3545";
      } else {
        summaryCharCount.style.color = "#6c757d";
      }
    });
  }

  // Add more gallery upload functionality
  const addGalleryUploadBtn = document.getElementById("addGalleryUpload");
  const galleryUploadsContainer = document.getElementById(
    "galleryUploadsContainer"
  );

  if (addGalleryUploadBtn && galleryUploadsContainer) {
    addGalleryUploadBtn.addEventListener("click", function () {
      const newUploadItem = document.createElement("div");
      newUploadItem.className = "gallery-upload-item mb-3";
      newUploadItem.innerHTML = `
        <div class="input-group">
          <input type="file" class="form-control gallery-upload" accept="image/*">
          <button class="btn btn-outline-danger remove-gallery-upload" type="button">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      galleryUploadsContainer.appendChild(newUploadItem);

      // Add event listener to the new remove button
      const removeBtn = newUploadItem.querySelector(".remove-gallery-upload");
      removeBtn.addEventListener("click", function () {
        galleryUploadsContainer.removeChild(newUploadItem);
      });
    });

    // Add event listeners to existing remove buttons
    document.querySelectorAll(".remove-gallery-upload").forEach((button) => {
      button.addEventListener("click", function () {
        const uploadItem = this.closest(".gallery-upload-item");
        galleryUploadsContainer.removeChild(uploadItem);
      });
    });
  }

  // Form submission
  const createAlumniStoryForm = document.getElementById(
    "createAlumniStoryForm"
  );
  if (createAlumniStoryForm) {
    createAlumniStoryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation can be added here
      // For now, we'll just show an alert
      alert("Alumni story submitted for review!");

      // Get form data
      const alumnusName = document.getElementById("alumnusName").value;
      const degreeYear = document.getElementById("degreeYear").value;
      const department = document.getElementById("department").value;
      const occupation = document.getElementById("occupation").value;
      const organization = document.getElementById("organization").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullStory = document.getElementById("fullStory").value;
      const achievements = document.getElementById("achievements").value;
      const videoLink = document.getElementById("videoLink").value;
      const tags = document.getElementById("tags").value;

      // Get selected audience
      const audience = [];
      document
        .querySelectorAll('input[type="checkbox"]:checked')
        .forEach((checkbox) => {
          audience.push(checkbox.value);
        });

      // Prepare data for saving
      const storyData = {
        alumnusName: alumnusName,
        degreeYear: degreeYear,
        department: department,
        occupation: occupation,
        organization: organization,
        shortSummary: shortSummary,
        fullStory: fullStory,
        achievements: achievements,
        videoLink: videoLink,
        tags: tags,
        audience: audience,
      };

      // Save to under review submissions
      if (typeof saveSubmittedContent === "function") {
        saveSubmittedContent(storyData, "alumniStory");
      }

      // Reset form after submission
      createAlumniStoryForm.reset();
    });
  }

  // Draft save functionality
  const draftBtn = document.querySelector(".draft-btn");
  if (draftBtn) {
    draftBtn.addEventListener("click", function () {
      // Get form data
      const alumnusName = document.getElementById("alumnusName").value;
      const degreeYear = document.getElementById("degreeYear").value;
      const department = document.getElementById("department").value;
      const occupation = document.getElementById("occupation").value;
      const organization = document.getElementById("organization").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullStory = document.getElementById("fullStory").value;
      const achievements = document.getElementById("achievements").value;
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
        type: "alumniStory",
        alumnusName: alumnusName,
        degreeYear: degreeYear,
        department: department,
        occupation: occupation,
        organization: organization,
        shortSummary: shortSummary,
        fullStory: fullStory,
        achievements: achievements,
        videoLink: videoLink,
        tags: tags,
        audience: audience,
        date: new Date().toISOString(),
      };

      // Save draft to localStorage
      saveDraft(draft);

      // Show success message and redirect to drafts page
      alert("Alumni story saved as draft successfully!");
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
      if (draft.alumnusName)
        document.getElementById("alumnusName").value = draft.alumnusName;
      if (draft.degreeYear)
        document.getElementById("degreeYear").value = draft.degreeYear;
      if (draft.department)
        document.getElementById("department").value = draft.department;
      if (draft.occupation)
        document.getElementById("occupation").value = draft.occupation;
      if (draft.organization)
        document.getElementById("organization").value = draft.organization;
      if (draft.shortSummary)
        document.getElementById("shortSummary").value = draft.shortSummary;
      if (draft.fullStory)
        document.getElementById("fullStory").value = draft.fullStory;
      if (draft.achievements)
        document.getElementById("achievements").value = draft.achievements;
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
