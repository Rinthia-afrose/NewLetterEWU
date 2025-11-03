document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createBooksForm");

  // Save as Draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const draft = {
      type: "booksAndEditedBooks",
      authors: document.getElementById("authors").value,
      year: document.getElementById("year").value,
      bookTitle: document.getElementById("bookTitle").value,
      publicationPlace: document.getElementById("publicationPlace").value,
      publisher: document.getElementById("publisher").value,
      isbn: document.getElementById("isbn").value,
      criteria: document.getElementById("criteria").value,
      savedAt: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Book/Edited Book saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for Review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = [
      "authors",
      "year",
      "bookTitle",
      "publicationPlace",
      "publisher",
      "criteria",
    ];

    for (let id of requiredFields) {
      if (!document.getElementById(id).value.trim()) {
        alert("Please fill in all required fields marked with *");
        return;
      }
    }

    alert("Book/Edited Book submitted for review successfully!");
    form.reset();
  });
});
