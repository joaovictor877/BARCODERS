// Este arquivo é responsável apenas pela conexão com o banco de dados MySQL.
// Não configure CORS ou rotas aqui.

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'barcodersdb.mysql.database.azure.com',
  user: process.env.DB_USER || 'agente',
  password: process.env.DB_PASS || 'Agentedeestoque',
  database: process.env.DB_NAME || 'estoque',
  port: 3306,
  ssl: { rejectUnauthorized: false }
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

module.exports = connection;
