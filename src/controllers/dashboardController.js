var dashboardModel = require("../models/dashboardModel.js")


function verGrafico1(req, res) {

    // const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashboardModel.verGrafico1(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);


    });
}

function verGrafico2(req, res) {
    // const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashboardModel.verGrafico2(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verGrafico3(req, res) {
    // const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashboardModel.verGrafico3(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
   verGrafico1,
    verGrafico2,
    verGrafico3
}