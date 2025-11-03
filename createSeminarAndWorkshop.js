document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createSeminarForm");

  // Save as Draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("image");
    let imageName = "";
    if (fileInput.files.length > 0) {
      imageName = fileInput.files[0].name;
    }

    const draft = {
      type: "seminarAndWorkshop",
      names: document.getElementById("names").value,
      year: document.getElementById("year").value,
      workTitle: document.getElementById("workTitle").value,
      seminarPlace: document.getElementById("seminarPlace").value,
      date: document.getElementById("date").value,
      seminarSeries: document.getElementById("seminarSeries").value,
      image: imageName,
      savedAt: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Seminar/Workshop saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for Review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = ["names", "year", "workTitle", "seminarPlace", "date"];

    for (let id of requiredFields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Please fill in all required fields marked with *");
        return;
      }
    }

    alert("Seminar/Workshop submitted for review!");
    form.reset();
  });
});
