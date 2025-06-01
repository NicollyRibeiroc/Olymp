const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

//Conexão com o banco de dados
const conexao = mysql.createPool({
  host: 'localhost',
  user: 'root',       
  password: 'nilo0914',       
  database: 'Olymp',  
});

//Endpoint para ranking
app.get('/api/ranking', async (req, res) => {
  try {
    const [rows] = await conexao.query('SELECT * FROM ranking ORDER BY pontuacao DESC');
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar ranking' });
  }
});

//Endpoint para desempenho (dados do gráfico)
app.get('/api/desempenho', async (req, res) => {
  const query = `
    SELECT 
      q.categoria,
      SUM(d.acertos) AS total_acertos,
      SUM(d.total_perguntas - d.acertos) AS total_erros,
      COUNT(*) AS tentativas
    FROM Desempenhoquiz d
    JOIN Quiz q ON d.idQuiz = q.idQuiz
    GROUP BY q.categoria;
  `;

  try {
    const [rows] = await conexao.query(query);

    const dados = {
      facil: { acertos: 0, erros: 0, tentativas: 0 },
      medio: { acertos: 0, erros: 0, tentativas: 0 },
      dificil: { acertos: 0, erros: 0, tentativas: 0 },
    };

    rows.forEach(row => {
      const cat = row.categoria.toLowerCase();
      if (cat.includes('fácil') || cat.includes('facil')) {
        dados.facil = { acertos: row.total_acertos, erros: row.total_erros, tentativas: row.tentativas };
      } else if (cat.includes('médio') || cat.includes('medio')) {
        dados.medio = { acertos: row.total_acertos, erros: row.total_erros, tentativas: row.tentativas };
      } else if (cat.includes('difícil') || cat.includes('dificil')) {
        dados.dificil = { acertos: row.total_acertos, erros: row.total_erros, tentativas: row.tentativas };
      }
    });

    res.json(dados);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar desempenho' });
  }
});

//Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const session = require("express-session");

app.use(session({
    secret: "meu_segredo_supersecreto", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
