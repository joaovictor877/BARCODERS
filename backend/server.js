// Este arquivo é responsável por configurar o servidor Express, rotas, CORS e usar a conexão do db.js.

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connection = require('./db'); // Importa conexão centralizada
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer();

// Libera CORS apenas para seu domínio
app.use(cors({ origin: 'https://barcoders.azurewebsites.net' }));
app.use(express.json());

// Servir arquivos estáticos do frontend (ajuste o caminho se necessário)
// Se você está usando Vite/Tailwind no frontend, o build do frontend geralmente fica em uma pasta como '../dist'.
// Altere o caminho abaixo para servir a pasta de build do Vite:
app.use(express.static(path.join(__dirname, '../dist')));

// Endpoint de estoque (corrige erro 500 do /estoque)
app.get('/estoque', (req, res) => {
  connection.query('SELECT * FROM Estoque_MP', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Endpoint de estatísticas
app.get('/estatisticas', (req, res) => {
  connection.query('SELECT COUNT(*) as total_itens FROM Estoque_MP', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Endpoint de contato
app.post('/api/contact', upload.none(), (req, res) => {
  // Aqui você pode salvar no banco, enviar email, etc.
  // Exemplo: apenas retorna sucesso
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
