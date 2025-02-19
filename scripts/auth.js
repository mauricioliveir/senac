document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const resetPasswordForm = document.getElementById('reset-password-form');

    const backendUrl = 'https://senac-eta.vercel.app';

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${backendUrl}/login.html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'principal.html';
            } else {
                document.getElementById('error-message').textContent = data.error;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${backendUrl}/register.html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = 'login.html';
            } else {
                document.getElementById('error-message').textContent = data.error;
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            const response = await fetch(`${backendUrl}/reset-password.html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                document.getElementById('error-message').textContent = data.message;
            } else {
                document.getElementById('error-message').textContent = data.error;
            }
        });
    }
});
