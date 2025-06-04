const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '127.0.0.1',
  user: 'aluno',       
  password: 'Sptech#2024',   
  database: 'Olymp',
};

const pool = mysql.createPool(dbConfig);

// Rota de Ranking
router.get('/ranking', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT nome, pontuacao FROM ranking ORDER BY pontuacao DESC LIMIT 10'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar ranking' });
  }
});

// Rota de Desempenho
router.get('/desempenho', async (req, res) => {
  try {
    const sql = `
      SELECT q.categoria,
             SUM(d.acertos) as total_acertos,
             SUM(d.total_perguntas - d.acertos) as total_erros,
             COUNT(*) as total_tentativas
      FROM Desempenhoquiz d
      JOIN Quiz q ON d.IdQuiz = q.idQuiz
      GROUP BY q.categoria
    `;

    const [rows] = await pool.execute(sql);

    const resultado = {
      facil: { acertos: 0, erros: 0, tentativas: 0 },
      medio: { acertos: 0, erros: 0, tentativas: 0 },
      dificil: { acertos: 0, erros: 0, tentativas: 0 },
    };

    rows.forEach(row => {
      const cat = row.categoria
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      if (resultado[cat]) {
        resultado[cat] = {
          acertos: Number(row.total_acertos),
          erros: Number(row.total_erros),
          tentativas: Number(row.total_tentativas),
        };
      }
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar desempenho' });
  }
});

module.exports = router;
