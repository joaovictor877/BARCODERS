// Este arquivo é responsável por configurar o servidor Express, rotas, CORS e usar a conexão do db.js.

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connection = require('./db'); // Importa conexão centralizada

const app = express();
const port = process.env.PORT || 3000;
const upload = multer();

// Libera CORS apenas para seu domínio
app.use(cors({ origin: 'https://barcoders.azurewebsites.net' }));
app.use(express.json());

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
// Adicione isso para aceitar FormData:
app.post('/api/contact', upload.none(), (req, res) => {
  // Aqui você pode salvar no banco, enviar email, etc.
  // Exemplo: apenas retorna sucesso
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
