// apiquiz.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());  

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nilo0914',  
  database: 'Olymp'
});

app.post('/salvarDesempenho', (req, res) => {
  const { idUsuario, idQuiz, total_perguntas, acertos, percentual } = req.body;

  const sql = `INSERT INTO Desempenhoquiz (idUsuario, idQuiz, total_perguntas, acertos, percentual) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [idUsuario, idQuiz, total_perguntas, acertos, percentual], (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados: ", err);
      res.status(500).json({ error: "Erro ao inserir dados." });
    } else {
      console.log("Desempenho salvo com sucesso!");
      res.status(200).json({ message: "Desempenho salvo com sucesso!" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
