const connection = require('./kpi.js');

function totalAcertosPorQuiz() {
  const query = `
    SELECT 
      q.titulo, 
      SUM(d.acertos) AS total_acertos 
    FROM 
      Desempenhoquiz d 
    JOIN 
      Quiz q ON d.idQuiz = q.idQuiz 
    GROUP BY 
      q.titulo
    ORDER BY 
      total_acertos DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      return;
    }
    console.log('Total de acertos por quiz:');
    results.forEach((row) => {
      console.log(`Quiz: ${row.titulo} - Total de Acertos: ${row.total_acertos}`);
    });
  });
}

function mediaAcertosPorUsuario() {
  const query = `
    SELECT 
      u.nome, 
      AVG(d.acertos) AS media_acertos 
    FROM 
      Desempenhoquiz d 
    JOIN 
      usuario u ON d.idUsuario = u.idUsuario 
    GROUP BY 
      u.nome
    ORDER BY 
      media_acertos DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      return;
    }
    console.log('\nMédia de acertos por usuário:');
    results.forEach((row) => {
      console.log(`Usuário: ${row.nome} - Média de Acertos: ${row.media_acertos}`);
    });
  });
}

// Chamada das funções de KPI
totalAcertosPorQuiz();
mediaAcertosPorUsuario();
