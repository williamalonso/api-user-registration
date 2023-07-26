const mongoose = require('mongoose'); // importando o Mongoose

const userDB = 'williamalalonso';
const passwordDB = '33cPlmwOZ2bxUptd';

const connectionString = `mongodb+srv://${userDB}:${passwordDB}@apicluster.9roedc7.mongodb.net/?retryWrites=true&w=majority`;

// Conectar com Atlas
async function connectAtlas() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch(e) {
    console.error('Erro ao conectar com o MongoDB Atlas:', e);
  }
}

// exporte a configuração da conexão para ser utilizada em outros módulos
module.exports = connectAtlas;