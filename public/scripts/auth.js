document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        // Redirecionar para a página de dashboard ou outra página
    } else {
        document.getElementById('error-message').textContent = result.message;
    }
});

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        // Redirecionar para a página de login
    } else {
        document.getElementById('error-message').textContent = result.message;
    }
});

document.getElementById('reset-password-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        document.getElementById('error-message').textContent = result.message;
    }
});