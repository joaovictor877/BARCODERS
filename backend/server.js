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
// Se o index.html está na raiz do projeto, use '..'.
// Se o build do frontend está em 'dist', use '../dist'.
app.use(express.static(path.join(__dirname, '..')));

// Endpoint de estoque
app.get('/estoque', (req, res) => {
  connection.query('SELECT * FROM estoque_mp', (err, results) => {
    if (err) {
      console.error('Erro ao buscar estoque:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint de estatísticas
app.get('/estatisticas', (req, res) => {
  connection.query('SELECT COUNT(*) as total_itens FROM estoque_mp', (err, results) => {
    if (err) {
      console.error('Erro ao buscar estatísticas:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Endpoint de contato (corrige erro 404 do /api/contact)
app.post('/api/contact', upload.none(), (req, res) => {
  // Aqui você pode salvar no banco, enviar email, etc.
  res.status(200).json({ success: true });
});

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
  console.log(`Servidor rodando na porta ${port}`);
});
