document.addEventListener("DOMContentLoaded", () => {
  const addMemberBtn = document.getElementById("addMemberBtn");
  const researchTeamContainer = document.getElementById("researchTeamContainer");
  const form = document.getElementById("createResearchGrantForm");

  // Add more research team members
  addMemberBtn.addEventListener("click", () => {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("research-member", "mb-3", "border", "rounded", "p-3");
    memberDiv.innerHTML = `
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Full Name *</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Designation *</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="col-md-3 mb-3">
          <label class="form-label">Department *</label>
          <select class="form-select" required>
            <option value="">Select Department</option>
            <option>Computer Science and Engineering (CSE)</option>
            <option>Electrical and Electronic Engineering (EEE)</option>
            <option>Pharmacy</option>
            <option>Business Administration (BBA)</option>
            <option>Economics</option>
            <option>English</option>
            <option>Law</option>
            <option>Sociology</option>
            <option>Civil Engineering</option>
            <option>Architecture</option>
            <option>Journalism and Media Studies</option>
            <option>Mathematical and Physical Sciences</option>
          </select>
        </div>
        <div class="col-md-1 d-flex align-items-end">
          <button type="button" class="btn btn-danger btn-sm remove-member">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>`;
    researchTeamContainer.appendChild(memberDiv);

    // Remove member
    memberDiv.querySelector(".remove-member").addEventListener("click", () => {
      memberDiv.remove();
    });
  });

  // Draft Save
  document.querySelector(".draft-btn").addEventListener("click", () => {
    const members = [];
    document.querySelectorAll(".research-member").forEach((div) => {
      const name = div.querySelector('input[type="text"]').value;
      const designation = div.querySelectorAll('input[type="text"]')[1]?.value;
      const department = div.querySelector("select").value;
      members.push({ name, designation, department });
    });

    const draft = {
      type: "researchGrant",
      members: members,
      grantSource: document.getElementById("grantSource").value,
      grantAmount: document.getElementById("grantAmount").value,
      researchTopic: document.getElementById("researchTopic").value,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("drafts") || "[]");
    existing.push(draft);
    localStorage.setItem("drafts", JSON.stringify(existing));

    alert("Research Grant saved as draft!");
    window.location.href = "drafts.html";
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const source = document.getElementById("grantSource").value;
    if (!source) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    alert("Research Grant submitted for review!");
    form.reset();
  });
});
