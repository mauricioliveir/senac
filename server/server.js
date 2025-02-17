const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir CORS e parsear JSON
app.use(cors());
app.use(express.json());

// Configuração do Pool de conexão com o PostgreSQL
const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'expressly-reliable-platy.data-1.use1.tembo.io',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || 'zkgKkrl8be0Ypqmo',
    port: process.env.PGPORT || 5432,
    ssl: {
        rejectUnauthorized: false, // Use true em produção com um certificado válido
    },
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Tentativa de login:', email); // Log para depuração
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('Erro no login:', err); // Log para depuração
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});