var quizmedioModel = require("../models/quizmedioModel");

function cadastrar(req, res) {
  var idUsuario = req.body.idUsuarioServer;
  var fkQuiz  = req.body.fkQuizServer;
  var total_perguntas = req.body.total_perguntasServer;
  var acertos = req.body.acertosServer;
  var percentual =  percentualServer

  quizmedioModel.cadastrar(idUsuario, fkQuiz, total_perguntas, acertos, percentual)
    .then(function (resposta) {
      res.json(resposta)
      res.status(200).send("Tentativa criada com sucesso");
    }).catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    }
    )
}

module.exports = {
  cadastrar
};
