// Importo o arquivo de configuração do banco para poder executar comandos SQL
var database = require("../database/config");

// Função que vai autenticar o usuário no sistema, verificando email e senha
function autenticar(email, senha) {
    // Exibo um log no console para ajudar a debugar e confirmar que a função foi chamada
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar():", email, senha);
    
    // Crio a instrução SQL que vai procurar o usuário com o email e senha passados
    var instrucaoSql = `
        SELECT idUsuario, nome, email 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    // Mostro no console qual comando SQL vai ser executado, para ajudar no debug
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    // Retorno a execução da query, que vai devolver uma Promise com os resultados da consulta
    return database.executar(instrucaoSql);
}

// Função que vai cadastrar um novo usuário no banco
function cadastrar(nome, email, senha) {
    // Exibo um log no console para debugar e confirmar que estou dentro da função cadastrar
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Crio a instrução SQL que insere um novo usuário na tabela usuario com os dados recebidos
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    // Mostro no console o comando SQL que vai ser executado, para ajudar a entender o que está acontecendo
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Retorno a execução da query, que também é uma Promise que vai confirmar se deu certo o cadastro
    return database.executar(instrucaoSql);
}

// Exporto as funções para que possam ser usadas em outras partes do sistema, como no controller
module.exports = {
    autenticar,
    cadastrar
};
