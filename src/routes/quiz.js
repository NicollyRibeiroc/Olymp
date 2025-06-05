var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizController');

// Rota para buscar desempenho por usuário
router.get('/desempenho/:idUsuario', function(req, res) {
    quizController.buscarDesempenhoPorUsuario(req, res);
});

// Rota para ranking geral
router.get('/ranking', function(req, res) {
    quizController.rankingGeral(req, res);
});

// Rota para cadastrar desempenho do quiz (POST)
router.post('/cadastrar', function(req, res) {
    quizController.cadastrarDesempenho(req, res);
});


module.exports = router;
