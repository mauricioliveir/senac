require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// 🚀 Rota de Registro
app.post('/api/register', async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, hashedPassword]
        );
        
        res.status(201).json({ message: "Usuário registrado com sucesso!", user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário." });
    }
});

// 🚀 Rota de Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ error: "Senha incorreta" });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login bem-sucedido!", token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar login." });
    }
});

// 🚀 Rota para Reset de Senha
app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
        res.json({ message: "Senha atualizada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao redefinir senha." });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
