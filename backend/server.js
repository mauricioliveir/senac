require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Rota de Registro
app.post("/register", async (req, res) => {
    const { nome, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING id, email",
            [nome, email, hashedPassword]
        );
        res.status(201).json({ user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Rota de Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: "Usuário não encontrado" });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Senha incorreta" });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

// Middleware de autenticação
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Token necessário" });

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};

// Rota de usuário autenticado
app.get("/user", verifyToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT id, nome, email FROM users WHERE id = $1", [req.user.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
});

// Rota de recuperação de senha (simples)
app.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);
        res.json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao redefinir senha" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
