const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuração do banco
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Juca&ester12@!#',
  database: 'teste'
});

app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});