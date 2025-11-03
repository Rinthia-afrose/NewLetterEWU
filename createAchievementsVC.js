document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createAchievementsForm");

  // Save as Draft
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("photo");
    let photoName = "";
    if (fileInput.files.length > 0) {
      photoName = fileInput.files[0].name;
    }

    const draft = {
      type: "achievementsVC",
      optionType: document.getElementById("optionType").value,
      achievementText: document.getElementById("achievementText").value,
      photo: photoName,
      savedAt: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    alert("Achievement saved as draft successfully!");
    window.location.href = "drafts.html";
  });

  // Submit for Review
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const optionType = document.getElementById("optionType").value.trim();
    const achievementText = document
      .getElementById("achievementText")
      .value.trim();

    if (!optionType || !achievementText) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    alert("Achievement submitted for review successfully!");
    form.reset();
  });
});
