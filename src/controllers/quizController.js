var quizModel = require('../models/quizModel');

function buscarDesempenhoPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.buscarDesempenhoPorUsuario(idUsuario)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar desempenho" });
        });
}

function rankingGeral(req, res) {
    quizModel.rankingGeral()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar ranking" });
        });
}

function cadastrarDesempenho(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idQuiz = req.body.fkQuizServer;
    var totalPerguntas = req.body.total_perguntasServer;
    var acertos = req.body.acertosServer;
    var percentual = req.body.percentualServer;

    if (!idUsuario || !idQuiz || !totalPerguntas || acertos === undefined || percentual === undefined) {
        return res.status(400).json({ erro: "Dados incompletos para cadastro" });
    }

    quizModel.cadastrarDesempenho(idUsuario, idQuiz, totalPerguntas, acertos, percentual)
        .then(resultado => {
            res.json({ mensagem: "Desempenho cadastrado com sucesso" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao cadastrar desempenho" });
        });
}

module.exports = {
    buscarDesempenhoPorUsuario,
    rankingGeral,
    cadastrarDesempenho
};
