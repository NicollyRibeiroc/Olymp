var database = require("../database/config");

function cadastrar(idUsuario, fkQuiz, total_perguntas, acertos, percentual) {
  var instrucaoSql = `INSERT INTO Desempenhoquiz VALUES ('default', ${idUsuario}, ${fkQuiz}), ${total_perguntas}, ${acertos}, ${percentual}, 'default'`;

  return database.executar(instrucaoSql);
}

module.exports = { 
  cadastrar 
};
