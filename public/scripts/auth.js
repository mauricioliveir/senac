document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://senac-eta.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Armazena o estado de login no localStorage
            localStorage.setItem('isLoggedIn', 'true');
            // Redireciona para a página principal
            window.location.href = 'principal.html';
        } else {
            document.getElementById('error-message').textContent = result.message;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar ao servidor.');
    }
});

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://senac-eta.vercel.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Redireciona para a página de login após o registro
            window.location.href = 'login.html';
        } else {
            document.getElementById('error-message').textContent = result.message;
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao conectar ao servidor.');
    }
});

document.getElementById('reset-password-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://senac-eta.vercel.app/reset-password', {
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
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        alert('Erro ao conectar ao servidor.');
    }
});