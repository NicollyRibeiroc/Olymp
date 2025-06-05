var express = require("express");
var router = express.Router();

var quizmedioController = require("../controllers/quizmedioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    quizmedioController.cadastrar(req, res);
})

module.exports = router;