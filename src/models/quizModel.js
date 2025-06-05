var db = require('../database/config');

function buscarDesempenhoPorUsuario(idUsuario) {
    const query = `
        SELECT * FROM Desempenhoquiz
        WHERE idUsuario = ?;
    `;
    return db.executar(query, [idUsuario]);
}

function rankingGeral() {
    const query = `
        SELECT u.nome, SUM(d.acertos) AS total_pontuacao
        FROM Desempenhoquiz d
        JOIN usuario u ON d.idUsuario = u.idUsuario
        GROUP BY d.idUsuario
        ORDER BY total_pontuacao DESC
        LIMIT 10;
    `;
    return db.executar(query);
}

function cadastrarDesempenho(idUsuario, idQuiz, totalPerguntas, acertos, percentual) {
    const query = `
        INSERT INTO Desempenhoquiz (idUsuario, idQuiz, total_perguntas, acertos, percentual)
        VALUES (?, ?, ?, ?, ?);
    `;
    return db.executar(query, [idUsuario, idQuiz, totalPerguntas, acertos, percentual]);
}

module.exports = {
    buscarDesempenhoPorUsuario,
    rankingGeral,
    cadastrarDesempenho
};
