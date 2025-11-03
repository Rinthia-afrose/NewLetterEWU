document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createBookChapterForm");

  // Save as draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const draft = {
      type: "bookChapter",
      authors: document.getElementById("authors").value,
      year: document.getElementById("year").value,
      chapterTitle: document.getElementById("chapterTitle").value,
      bookName: document.getElementById("bookName").value,
      volumeNumber: document.getElementById("volumeNumber").value,
      pageRange: document.getElementById("pageRange").value,
      editors: document.getElementById("editors").value,
      publisher: document.getElementById("publisher").value,
      doi: document.getElementById("doi").value,
      date: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Book Chapter saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = [
      "authors",
      "year",
      "chapterTitle",
      "bookName",
      "volumeNumber",
      "pageRange",
    ];

    for (let id of requiredFields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Please fill in all required fields marked with *");
        return;
      }
    }

    alert("Book Chapter submitted for review!");
    form.reset();
  });
});
