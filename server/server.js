require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conectar ao PostgreSQL (Tembo AIO)
const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'expressly-reliable-platy.data-1.use1.tembo.io',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || 'zkgKkrl8be0Ypqmo',
    port: process.env.PGPORT || 5432,
    ssl: { rejectUnauthorized: false } // Importante para conexões remotas
});

// Teste de conexão
pool.connect()
    .then(() => console.log('📡 Conectado ao PostgreSQL!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

// Rota de login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

// Rota de registro
app.post('/api/register', async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING *', [nome, email, password]);
        res.json({ success: true, message: 'Usuário registrado!', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
