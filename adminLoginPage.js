// frontend/adminLoginPage.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const API_URL = "http://localhost:5000/api/auth/login";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.role === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("isLoggedIn", "true");
        alert("Welcome Admin!");
        window.location.href = "adminHomepage.html";
      } else {
        alert("Invalid admin credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Cannot connect to server.");
    }
  });
});
