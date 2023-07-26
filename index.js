const express = require('express'); // importando o Express 
const personRoutes = require('./routes/personRoutes'); // importando as rotas
const connectAtlas = require('./config/database'); // conectar com Atlas usando arquivo database.js
const port = 3000; // Porta que a API escuta

const app = express(); // inicializando o Express

// forma de ler JSON
app.use(
  express.urlencoded({extended: true}),
  express.json()
);

// Rota para post/Create
app.use('/person', personRoutes);


// Inicia a aplicação
connectAtlas().then( () => {
  app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
  });
});