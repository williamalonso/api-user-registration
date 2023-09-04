const Person = require('../models/Person');

// Função para criar uma nova pessoa
exports.createPerson = async (req, res) => {

  const { name, salary, approved } = req.body;

  if(!name) {
    return res.status(422).json({ error: 'O nome é obrigatório' });
  }

  const person = {
    name,
    salary,
    approved,
  }

  try {
    await Person.create(person);
    return res.status(201).json({ message: 'Pessoa inserida com sucesso' });
  } catch(e) {
    return res.status(500).json({ error: e });
  }
}

// Função para listar todas as pessoas
exports.getPeople = async(req, res) => {
  try {
    const people = await Person.find(); // traz todos os dados da Collection
    return res.status(200).json(people);
  } catch(e) {
    return res.status(500).json({ error: e })
  }
}

// Função para obter uma pessoa por ID
exports.getPersonById = async(req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id }); // buscando pelo '_id' do Atlas
    if(!person) {
      return res.status(422).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(person);
  } catch(e) {
    return res.status(500).json({ error: e });
  }
}

// Função para atualizar uma pessoa por ID
exports.updatePersonById = async(req, res) => {
  const id = req.params.id; // obtendo id da url
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updateResult = await Person.updateOne({ _id: id}, person); // atualiza o '_id' do Atlas
    if(updateResult.matchedCount === 0) {
      return res.status(422).json({ message: 'Não foi possível atualizar o usuário' });
    }
    return res.status(500).json(person);
  } catch(e) {
    return res.status(500).json({ error: e});
  }
}

// Função para excluir uma pessoa por ID
exports.deletePersonById = async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    return res.status(422).json({ message: 'Usuário não encontrado' });
  }

  try {
    await Person.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};