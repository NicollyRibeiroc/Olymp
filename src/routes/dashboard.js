var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/verGrafico1/:idUsuario", function (req, res) {
    dashboardController.verGrafico1(req, res);
});

router.get("/verGrafico2/:idUsuario", function (req, res) {
    dashboardController.verGrafico2(req, res);
});

router.get("/verGrafico3/:idUsuario", function (req, res) {
    dashboardController.verGrafico3(req, res);
});

module.exports = router;