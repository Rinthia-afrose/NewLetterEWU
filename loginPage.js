// frontend/loginPage.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector(".btn-primary");

  const API_BASE = "http://localhost:5000/api/auth/login";

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful!");

        if (data.role === "admin") {
          window.location.href = "adminHomepage.html";
        } else if (data.role === "faculty") {
          window.location.href = "facultyHomepage.html";
        } else {
          window.location.href = "homepage.html";
        }
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server connection failed. Make sure backend is running.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Sign in";
    }
  });
});
