const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco
const connection = mysql.createConnection({
      host: 'barcodersdb.mysql.database.azure.com',
      user: 'joaodmin1@barcodersdb',
      password: 'Juca&ester', // Substitua pela sua senha real
      database: 'estoque', // Substitua pelo nome do seu banco
      port: 3306
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