CREATE DATABASE Olymp;
USE Olymp;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY auto_increment,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL);

CREATE TABLE Quiz (
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR (45) NOT NULL,
	categoria VARCHAR(45));

CREATE TABLE Desempenhoquiz (
    idDesempenho INT PRIMARY KEY AUTO_INCREMENT,
    idCadastro INT NOT NULL,
    IdQuiz INT NOT NULL,
    total_perguntas INT NOT NULL,
    acertos INT NOT NULL,
    percentual DECIMAL(5,2) NOT NULL,
    data_realizacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idCadastro) REFERENCES cadastro(idCadastro),
    FOREIGN KEY (idQuiz) REFERENCES Quiz(idQuiz)
);

select * from Cadastro;