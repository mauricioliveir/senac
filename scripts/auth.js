const API_URL = "https://senac-eta.vercel.app/pages/register"; // Ajuste conforme necessário

// 🚀 Registrar usuário
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "login.html";
});

// 🚀 Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "principal.html";
    } else {
        alert(data.error);
    }
});

// 🚀 Resetar senha
document.getElementById('reset-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const newPassword = prompt("Digite sua nova senha:");

    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "login.html";
});

// 🚀 Verificar se o usuário está logado
if (window.location.pathname.includes("principal.html")) {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
}
