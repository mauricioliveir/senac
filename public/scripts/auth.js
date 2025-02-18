document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://seu-backend.vercel.app/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "index.html";
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://seu-backend.vercel.app/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, password })
        });

        const data = await response.json();
        if (data.success) {
            alert('Usuário registrado com sucesso!');
            window.location.href = "login.html";
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});
