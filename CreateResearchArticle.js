// Create Research Article Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any specific functionality for the create research page

  // Form submission handling
  const createResearchForm = document.getElementById("createResearchForm");

  if (createResearchForm) {
    createResearchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("researchTitle").value;
      const researchType = document.getElementById("researchType").value;
      const researchArea = document.getElementById("researchArea").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const researchers = document.getElementById("researchers").value;
      const abstract = document.getElementById("abstract").value;
      const fullArticle = document.getElementById("fullArticle").value;
      const publicationStatus =
        document.getElementById("publicationStatus").value;
      const keywords = document.getElementById("keywords").value;

      // Check required fields
      if (
        !title ||
        !researchType ||
        !researchArea ||
        !startDate ||
        !endDate ||
        !researchers ||
        !abstract ||
        !fullArticle ||
        !publicationStatus ||
        !keywords
      ) {
        alert("Please fill in all required fields (marked with *).");
        return;
      }

      // Check if end date is after start date
      if (new Date(endDate) < new Date(startDate)) {
        alert("End date must be after start date.");
        return;
      }

      // If validation passes, show success message
      alert("Research article submitted for review successfully!");
      // In a real application, you would send the data to a server here
      // createResearchForm.reset(); // Uncomment to reset form after submission
    });

    // Draft button handling
    const draftBtn = document.querySelector(".draft-btn");
    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // Get form data
        const title = document.getElementById("researchTitle").value;
        const researchType = document.getElementById("researchType").value;
        const researchArea = document.getElementById("researchArea").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const researchers = document.getElementById("researchers").value;
        const abstract = document.getElementById("abstract").value;
        const fullArticle = document.getElementById("fullArticle").value;
        const methodology = document.getElementById("methodology").value;
        const findings = document.getElementById("findings").value;
        const videoLink = document.getElementById("videoLink").value;
        const publicationStatus =
          document.getElementById("publicationStatus").value;
        const publicationDetails =
          document.getElementById("publicationDetails").value;
        const funding = document.getElementById("funding").value;
        const keywords = document.getElementById("keywords").value;
        const citations = document.getElementById("citations").value;

        // Create draft object
        const draft = {
          type: "research",
          title: title,
          researchType: researchType,
          researchArea: researchArea,
          startDate: startDate,
          endDate: endDate,
          researchers: researchers,
          abstract: abstract,
          fullArticle: fullArticle,
          methodology: methodology,
          findings: findings,
          videoLink: videoLink,
          publicationStatus: publicationStatus,
          publicationDetails: publicationDetails,
          funding: funding,
          keywords: keywords,
          citations: citations,
          date: new Date().toISOString(),
        };

        // Save draft to localStorage
        saveDraft(draft);

        // Show success message and redirect to drafts page
        alert("Research article saved as draft successfully!");
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
      if (draft.title)
        document.getElementById("researchTitle").value = draft.title;
      if (draft.researchType)
        document.getElementById("researchType").value = draft.researchType;
      if (draft.researchArea)
        document.getElementById("researchArea").value = draft.researchArea;
      if (draft.startDate)
        document.getElementById("startDate").value = draft.startDate;
      if (draft.endDate)
        document.getElementById("endDate").value = draft.endDate;
      if (draft.researchers)
        document.getElementById("researchers").value = draft.researchers;
      if (draft.abstract)
        document.getElementById("abstract").value = draft.abstract;
      if (draft.fullArticle)
        document.getElementById("fullArticle").value = draft.fullArticle;
      if (draft.methodology)
        document.getElementById("methodology").value = draft.methodology;
      if (draft.findings)
        document.getElementById("findings").value = draft.findings;
      if (draft.videoLink)
        document.getElementById("videoLink").value = draft.videoLink;
      if (draft.publicationStatus)
        document.getElementById("publicationStatus").value =
          draft.publicationStatus;
      if (draft.publicationDetails)
        document.getElementById("publicationDetails").value =
          draft.publicationDetails;
      if (draft.funding)
        document.getElementById("funding").value = draft.funding;
      if (draft.keywords)
        document.getElementById("keywords").value = draft.keywords;
      if (draft.citations)
        document.getElementById("citations").value = draft.citations;
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
