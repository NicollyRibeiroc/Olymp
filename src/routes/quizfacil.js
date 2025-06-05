var express = require("express");
var router = express.Router();

var quizfacilController = require("../controllers/quizFacilController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    quizfacilController.cadastrar(req, res);
})

module.exports = router;