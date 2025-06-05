// Importo o módulo 'mysql2' para poder fazer a conexão com o banco de dados MySQL
var mysql = require("mysql2");

// Defino as configurações para conectar no banco, usando as variáveis de ambiente que guardei no .env
var mySqlConfig = {
    host: process.env.DB_HOST,       // O endereço do servidor do banco
    database: process.env.DB_DATABASE, // O nome do banco de dados que vou usar
    user: process.env.DB_USER,       // O usuário para acessar o banco
    password: process.env.DB_PASSWORD, // A senha desse usuário
    port: process.env.DB_PORT        // A porta do banco (normalmente 3306)
};

// Crio a função 'executar' que vai receber uma instrução SQL para executar no banco
function executar(instrucao, params = []) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect(function (err) {
            if (err) {
                console.error("Erro ao conectar no banco:", err);
                reject(err);
                return;
            }

            conexao.query(instrucao, params, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                    return;
                }
                console.log(resultados);
                resolve(resultados);
            });
        });

        conexao.on('error', function (erro) {
            console.error("ERRO NO MySQL SERVER:", erro.sqlMessage);
        });
    });
}


// Exporto essa função para poder usar em outros arquivos do meu projeto
module.exports = {
    executar
};
