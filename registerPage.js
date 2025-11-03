// frontend/registerPage.js

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".form");
  const API_URL = "http://localhost:5000/api/auth/register";

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!id || !name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registration successful! You can now log in.");
        window.location.href = "loginPage.html";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Could not connect to server.");
    }
  });
});
