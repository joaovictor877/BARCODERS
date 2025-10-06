const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Serve arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname));

// Serve index.html na rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração do banco
const connection = mysql.createConnection({
  host: 'barcodersdb.mysql.database.azure.com',
  user: 'joaodmin1@barcodersdb',
  password: 'Juca&ester', // Substitua pela sua senha real
  database: 'estoque', // Substitua pelo nome do seu banco
  port: 3306
});

// Endpoint para dados do estoque
app.get('/estoque', (req, res) => {
  connection.query('SELECT BarCode, Quantidade, fk_Tipos_MP_TipoMP FROM Estoque_MP', (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});