const mysql = require('mysql2');

// Conexão ao banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nilo0914',  
  database: 'Olymp'
});

// Testar a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão: ', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

module.exports = connection;
