const express = require('express');
const app = express();

// Rota de exemplo
app.get('/api', (req, res) => {
  res.json( {message: 'Olá, esta é minha API'} );
});

// Porta que a API escuta
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
