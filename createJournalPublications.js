document.addEventListener("DOMContentLoaded", () => {
  const addAuthorBtn = document.getElementById("addAuthorBtn");
  const authorsContainer = document.getElementById("authorsContainer");
  const form = document.getElementById("createJournalForm");

  // Add author entry
  addAuthorBtn.addEventListener("click", () => {
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author-entry", "mb-3", "border", "rounded", "p-3");
    authorDiv.innerHTML = `
      <div class="row">
        <div class="col-md-11 mb-3">
          <label class="form-label">Author Name *</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="col-md-1 d-flex align-items-end">
          <button type="button" class="btn btn-danger btn-sm remove-author">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>`;
    authorsContainer.appendChild(authorDiv);

    // Delete author entry
    authorDiv.querySelector(".remove-author").addEventListener("click", () => {
      authorDiv.remove();
    });
  });

  // Save as draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const authors = [];
    document.querySelectorAll(".author-entry input").forEach((input) => {
      if (input.value.trim()) authors.push(input.value.trim());
    });

    const draft = {
      type: "journalPublication",
      authors: authors,
      year: document.getElementById("year").value,
      publicationName: document.getElementById("publicationName").value,
      journalName: document.getElementById("journalName").value,
      volumeNumber: document.getElementById("volumeNumber").value,
      issueNumber: document.getElementById("issueNumber").value,
      pageNumber: document.getElementById("pageNumber").value,
      doi: document.getElementById("doi").value,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("drafts") || "[]");
    existing.push(draft);
    localStorage.setItem("drafts", JSON.stringify(existing));

    alert("Journal Publication saved as draft!");
    window.location.href = "drafts.html";
  });

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const year = document.getElementById("year").value;
    const pub = document.getElementById("publicationName").value;
    const journal = document.getElementById("journalName").value;
    const volume = document.getElementById("volumeNumber").value;
    const authors = document.querySelectorAll(".author-entry input");
    let valid = true;

    authors.forEach((a) => {
      if (!a.value.trim()) valid = false;
    });

    if (!year || !pub || !journal || !volume || !valid) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    alert("Journal Publication submitted for review!");
    form.reset();
  });
});
