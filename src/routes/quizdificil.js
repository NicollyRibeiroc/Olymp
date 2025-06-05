var express = require("express");
var router = express.Router();

var quizdificilController = require("../controllers/quizdificilController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    quizdificilController.cadastrar(req, res);
})

module.exports = router;