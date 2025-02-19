const API_URL = "https://senac-eta.vercel.app/api/auth";  // Adicionado "/api/auth"

// ✅ Login
document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro desconhecido");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } catch (error) {
        document.getElementById("error-message").innerText = error.message;
    }
});

// ✅ Registro
document.getElementById("register-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro desconhecido");
        }

        alert("Registro bem-sucedido! Faça login.");
        window.location.href = "login.html";
    } catch (error) {
        document.getElementById("error-message").innerText = error.message;
    }
});

// ✅ Resetar senha
document.getElementById("reset-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const newPassword = prompt("Digite sua nova senha:");

    if (!newPassword) return;

    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await response.json();
        alert(data.message || "Erro ao redefinir senha");
    } catch (error) {
        alert("Erro ao redefinir senha");
    }
});

// ✅ Verificar usuário logado
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        if (window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
            window.location.href = "login.html";
        }
        return;
    }

    try {
        const response = await fetch(`${API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
});

// ✅ Logout
document.getElementById("logout-button")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
