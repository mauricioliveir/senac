const API_URL = "https://senac-eta.vercel.app/";

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

// Resetar senha
document.getElementById("reset-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const newPassword = prompt("Digite sua nova senha:");

    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    alert(data.message || "Erro ao redefinir senha");
});

// Verificar usuário logado
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        if (window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
            window.location.href = "login.html";
        }
        return;
    }

    const response = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
});

// Logout
document.getElementById("logout-button")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
