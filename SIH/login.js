
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (username && password && role) {
      
      localStorage.setItem("pqmpUser", JSON.stringify({ username, role }));
      window.location.href = "db.html";
    } else {
      alert("Please fill in all fields");
    }
  });
}


if (window.location.pathname.endsWith("db.html")) {
  const user = JSON.parse(localStorage.getItem("pqmpUser"));
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("welcomeUser").textContent = `Welcome, ${user.username} (${user.role})`;
    });
  }
}


function logout() {
  localStorage.removeItem("pqmpUser");
  window.location.href = "login.html";
}
