const API_URL = "http://localhost:3000";

// Login
document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        document.getElementById("error-message").innerText = data.error;
    }
});

// Registro
document.getElementById("register-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Registro bem-sucedido! Faça login.");
        window.location.href = "login.html";
    } else {
        document.getElementById("error-message").innerText = data.error;
    }
});
