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
function executar(instrucao) {

    // Primeiro verifico se o ambiente está definido corretamente (produção ou desenvolvimento)
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        // Se não estiver definido, mostro uma mensagem de erro e retorno uma Promise rejeitada com uma mensagem
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    // Aqui retorno uma nova Promise porque a execução da query é assíncrona
    return new Promise(function (resolve, reject) {
        // Crio a conexão com o banco usando as configurações que defini antes
        var conexao = mysql.createConnection(mySqlConfig);
        // Conecto no banco
        conexao.connect();
        // Executo a query SQL que foi passada como parâmetro
        conexao.query(instrucao, function (erro, resultados) {
            // Depois que a query termina, fecho a conexão
            conexao.end();
            // Se deu algum erro, rejeito a Promise passando o erro
            if (erro) {
                reject(erro);
            }
            // Se não teve erro, mostro os resultados no console
            console.log(resultados);
            // E resolvo a Promise passando os resultados para quem chamou a função
            resolve(resultados);
        });
        // Caso aconteça um erro de conexão no MySQL, trato ele aqui
        conexao.on('error', function (erro) {
            // Apenas retorno uma mensagem com o erro do MySQL
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

// Exporto essa função para poder usar em outros arquivos do meu projeto
module.exports = {
    executar
};
