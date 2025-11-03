document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createConferencePresentationForm");

  // Save as Draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const draft = {
      type: "conferencePresentation",
      authors: document.getElementById("authors").value,
      year: document.getElementById("year").value,
      paperTitle: document.getElementById("paperTitle").value,
      conferenceName: document.getElementById("conferenceName").value,
      conferencePlace: document.getElementById("conferencePlace").value,
      presentationDate: document.getElementById("presentationDate").value,
      organizer: document.getElementById("organizer").value,
      date: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Conference Presentation saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for Review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = [
      "authors",
      "year",
      "paperTitle",
      "conferenceName",
      "conferencePlace",
      "presentationDate",
    ];

    for (let id of requiredFields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Please fill in all required fields marked with *");
        return;
      }
    }

    alert("Conference Presentation submitted for review!");
    form.reset();
  });
});
