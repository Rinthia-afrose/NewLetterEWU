// Character counter for short summary
document.addEventListener("DOMContentLoaded", function () {
  const summaryTextarea = document.getElementById("shortSummary");
  const charCountSpan = document.getElementById("summaryCharCount");

  if (summaryTextarea && charCountSpan) {
    summaryTextarea.addEventListener("input", function () {
      const currentLength = this.value.length;
      charCountSpan.textContent = currentLength;

      // Optional: Change color when approaching limit
      if (currentLength > 180) {
        charCountSpan.style.color = "#dc3545"; // Red when close to limit
      } else {
        charCountSpan.style.color = "#6c757d"; // Default color
      }

      // Draft save functionality
      const draftBtn = document.querySelector(".draft-btn");
      if (draftBtn) {
        draftBtn.addEventListener("click", function () {
          // Get form data
          const scholarshipTitle =
            document.getElementById("scholarshipTitle").value;
          const scholarshipType =
            document.getElementById("scholarshipType").value;
          const provider = document.getElementById("provider").value;
          const degreeLevel = document.getElementById("degreeLevel").value;
          const applicationDeadline = document.getElementById(
            "applicationDeadline"
          ).value;
          const awardAmount = document.getElementById("awardAmount").value;
          const duration = document.getElementById("duration").value;
          const contactPerson = document.getElementById("contactPerson").value;
          const shortSummary = document.getElementById("shortSummary").value;
          const fullArticle = document.getElementById("fullArticle").value;
          const eligibilityCriteria = document.getElementById(
            "eligibilityCriteria"
          ).value;
          const applicationProcedure = document.getElementById(
            "applicationProcedure"
          ).value;
          const selectionProcess =
            document.getElementById("selectionProcess").value;
          const importantNotes =
            document.getElementById("importantNotes").value;
          const videoLink = document.getElementById("videoLink").value;
          const tags = document.getElementById("tags").value;

          // Get selected departments
          const eligibleDepartments = [];
          const departmentSelect = document.getElementById(
            "eligibleDepartments"
          );
          for (let i = 0; i < departmentSelect.options.length; i++) {
            if (departmentSelect.options[i].selected) {
              eligibleDepartments.push(departmentSelect.options[i].value);
            }
          }

          // Get selected audience
          const audience = [];
          document
            .querySelectorAll('input[type="checkbox"]:checked')
            .forEach((checkbox) => {
              audience.push(checkbox.value);
            });

          // Create draft object
          const draft = {
            type: "scholarship",
            scholarshipTitle: scholarshipTitle,
            scholarshipType: scholarshipType,
            provider: provider,
            degreeLevel: degreeLevel,
            applicationDeadline: applicationDeadline,
            awardAmount: awardAmount,
            duration: duration,
            contactPerson: contactPerson,
            shortSummary: shortSummary,
            fullArticle: fullArticle,
            eligibilityCriteria: eligibilityCriteria,
            applicationProcedure: applicationProcedure,
            selectionProcess: selectionProcess,
            importantNotes: importantNotes,
            videoLink: videoLink,
            tags: tags,
            eligibleDepartments: eligibleDepartments,
            audience: audience,
            date: new Date().toISOString(),
          };

          // Save draft to localStorage
          saveDraft(draft);

          // Show success message and redirect to drafts page
          alert("Scholarship saved as draft successfully!");
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
          if (draft.scholarshipTitle)
            document.getElementById("scholarshipTitle").value =
              draft.scholarshipTitle;
          if (draft.scholarshipType)
            document.getElementById("scholarshipType").value =
              draft.scholarshipType;
          if (draft.provider)
            document.getElementById("provider").value = draft.provider;
          if (draft.degreeLevel)
            document.getElementById("degreeLevel").value = draft.degreeLevel;
          if (draft.applicationDeadline)
            document.getElementById("applicationDeadline").value =
              draft.applicationDeadline;
          if (draft.awardAmount)
            document.getElementById("awardAmount").value = draft.awardAmount;
          if (draft.duration)
            document.getElementById("duration").value = draft.duration;
          if (draft.contactPerson)
            document.getElementById("contactPerson").value =
              draft.contactPerson;
          if (draft.shortSummary)
            document.getElementById("shortSummary").value = draft.shortSummary;
          if (draft.fullArticle)
            document.getElementById("fullArticle").value = draft.fullArticle;
          if (draft.eligibilityCriteria)
            document.getElementById("eligibilityCriteria").value =
              draft.eligibilityCriteria;
          if (draft.applicationProcedure)
            document.getElementById("applicationProcedure").value =
              draft.applicationProcedure;
          if (draft.selectionProcess)
            document.getElementById("selectionProcess").value =
              draft.selectionProcess;
          if (draft.importantNotes)
            document.getElementById("importantNotes").value =
              draft.importantNotes;
          if (draft.videoLink)
            document.getElementById("videoLink").value = draft.videoLink;
          if (draft.tags) document.getElementById("tags").value = draft.tags;

          // Set eligible departments
          if (
            draft.eligibleDepartments &&
            Array.isArray(draft.eligibleDepartments)
          ) {
            const departmentSelect = document.getElementById(
              "eligibleDepartments"
            );
            for (let i = 0; i < departmentSelect.options.length; i++) {
              if (
                draft.eligibleDepartments.includes(
                  departmentSelect.options[i].value
                )
              ) {
                departmentSelect.options[i].selected = true;
              }
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
    });
  }

  // Form submission handler
  const form = document.getElementById("createScholarshipForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const title = document.getElementById("scholarshipTitle").value;
      const provider = document.getElementById("provider").value;
      const shortSummary = document.getElementById("shortSummary").value;
      const fullArticle = document.getElementById("fullArticle").value;
      const eligibility = document.getElementById("eligibilityCriteria").value;
      const procedure = document.getElementById("applicationProcedure").value;

      if (
        !title ||
        !provider ||
        !shortSummary ||
        !fullArticle ||
        !eligibility ||
        !procedure
      ) {
        alert("Please fill in all required fields marked with *");
        return;
      }

      // In a real application, you would send the data to a server here
      alert("Scholarship submitted for review!");
      form.reset();
    });
  }
});
