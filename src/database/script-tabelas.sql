CREATE DATABASE Olymp;
USE Olymp;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL
);

CREATE TABLE ranking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  pontuacao INT NOT NULL
);

CREATE TABLE Quiz (
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(45) NOT NULL,
	categoria VARCHAR(45) NOT NULL
);

CREATE TABLE Desempenhoquiz (
    idDesempenho INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    IdQuiz INT NOT NULL,
    total_perguntas INT NOT NULL,
    acertos INT NOT NULL,
    percentual DECIMAL(5,2) NOT NULL,
    data_realizacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idQuiz) REFERENCES Quiz(idQuiz)
);

-- Inserir usuários
INSERT INTO usuario (nome, email, senha) VALUES
('Gustavo', 'gus@gmail.com', '123'),
('Atena', 'atena@gmail.com', '123'),
('Apolo', 'apolo@gmail.com', '123');

-- Inserir ranking inicial
INSERT INTO ranking (nome, pontuacao) VALUES
('Gustavo', 95),
('Atena', 90),
('Apolo', 88),
('Hera', 85),
('Hércules', 80);

-- Inserir quizzes
INSERT INTO Quiz (titulo, categoria) VALUES 
('Quiz História Fácil', 'facil'),
('Quiz História Médio', 'medio'),
('Quiz História Difícil', 'dificil');

-- Inserir desempenho dos usuários
INSERT INTO Desempenhoquiz (idUsuario, IdQuiz, total_perguntas, acertos, percentual) VALUES
(1, 1, 10, 8, 80.00),
(1, 2, 10, 6, 60.00),
(1, 3, 10, 4, 40.00),
(2, 1, 10, 9, 90.00),
(2, 2, 10, 5, 50.00),
(2, 3, 10, 3, 30.00),
(3, 1, 10, 7, 70.00),
(3, 1, 10, 6, 60.00),
(3, 3, 10, 5, 50.00);
