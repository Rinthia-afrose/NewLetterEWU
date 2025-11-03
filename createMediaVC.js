document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createMediaForm");

  // Save as Draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("photo");
    let photoName = "";
    if (fileInput.files.length > 0) {
      photoName = fileInput.files[0].name;
    }

    const draft = {
      type: "mediaVC",
      webLink: document.getElementById("webLink").value,
      mediaText: document.getElementById("mediaText").value,
      photo: photoName,
      savedAt: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Media entry saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for Review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textValue = document.getElementById("mediaText").value.trim();

    if (!textValue) {
      alert("Please enter media text before submitting!");
      return;
    }

    alert("Media entry submitted for review!");
    form.reset();
  });
});
