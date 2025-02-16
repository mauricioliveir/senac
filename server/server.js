const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true', // Habilita SSL se necessário
  });

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de registro
app.post('/register', async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING *', [nome, email, password]);
        res.status(201).json({ message: 'Usuário registrado com sucesso', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de recuperação de senha
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            // Aqui você pode adicionar a lógica para enviar um email de recuperação de senha
            res.status(200).json({ message: 'Email de recuperação enviado' });
        } else {
            res.status(404).json({ message: 'Email não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});