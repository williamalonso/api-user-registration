const mongoose = require('mongoose');

// O banco sempre cria o plural do nome que eu inserir aqui
const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean
});

module.exports = Person;