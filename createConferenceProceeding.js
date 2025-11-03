document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createConferenceForm");

  // Save as draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const draft = {
      type: "conferenceProceeding",
      authors: document.getElementById("authors").value,
      year: document.getElementById("year").value,
      publicationName: document.getElementById("publicationName").value,
      conferenceName: document.getElementById("conferenceName").value,
      conferencePlace: document.getElementById("conferencePlace").value,
      conferenceDate: document.getElementById("conferenceDate").value,
      pageRange: document.getElementById("pageRange").value,
      doi: document.getElementById("doi").value,
      date: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Conference Proceeding saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = [
      "authors",
      "year",
      "publicationName",
      "conferenceName",
      "conferencePlace",
    ];

    for (let id of requiredFields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Please fill in all required fields marked with *");
        return;
      }
    }

    alert("Conference Proceeding submitted for review!");
    form.reset();
  });
});
