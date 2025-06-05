var database = require("../database/config")

function verGrafico1(idUsuario) {
    var instrucaoSql = `
        SELECT DATE(dq.data_realizacao) AS Data, q.titulo AS Quiz, SUM(dq.acertos) AS totalAcertos
        FROM Desempenhoquiz dq
        JOIN usuario u ON dq.idUsuario = u.idUsuario
        JOIN Quiz q ON dq.idQuiz = q.idQuiz
        WHERE dq.idUsuario = ${idUsuario}
        GROUP BY DATE(dq.data_realizacao), q.titulo
        ORDER BY DATE(dq.data_realizacao) DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verGrafico2() {
    var instrucaoSql = `
        SELECT u.nome, SUM(dq.acertos) AS totalPontos
        FROM usuario u
        JOIN Desempenhoquiz dq ON u.idUsuario = dq.idUsuario
        GROUP BY u.nome
        ORDER BY totalPontos DESC
        LIMIT 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verGrafico3() {
    var instrucaoSql = `
        SELECT q.titulo AS Quiz, 
               AVG(dq.acertos) AS mediaAcertos
        FROM Quiz q
        JOIN Desempenhoquiz dq ON q.idQuiz = dq.idQuiz
        GROUP BY q.titulo
        ORDER BY mediaAcertos ASC
        LIMIT 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    verGrafico1,
    verGrafico2,
    verGrafico3
};
