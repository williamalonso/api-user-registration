const router = require('express').Router(); // chamando o Router do Express
const Person = require('../models/Person'); // importando o model

// criar novo dado
router.post('/', async(req, res) => {
  
  const {name, salary, approved} = req.body;
  
  if(!name) {
    res.status(422).json({error:'O nome é obrigatório!'});
    return;
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person);
    res.status(201).json({message:'Pessoa inserida com sucesso!'});
  } catch(e) {
    res.status(500).json({error:e});
  }

});

// trazer todos os dados
router.get('/getusers', async(req, res) => {
  
  try {
    const people = await Person.find(); // traz todos os dados da Collection
    res.status(201).json(people);
  } catch(e) {
    res.status(500).json({error:e});
  }

})

// trazer um dado
router.get('/:id', async(req, res) => {
  
  const id = req.params.id; // obtendo id da url

  try {
    const person = await Person.findOne({ _id: id }); // buscando pelo '_id' do Atlas
    
    if(!person) {
      res.status(422).json({message: 'Usuário não encontrado'});
      return;
    }

    res.status(201).json(person);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

// atualizar um dado
router.patch('/update/:id', async(req,res) => {

  const id = req.params.id; // obtendo id da url
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved
  }

  try {
    const update_person = await Person.updateOne({ _id: id }, person); // atualiza o '_id' do Atlas

    if(update_person.matchedCount === 0) {
      res.status(422).json({ message: 'Não foi possível atualizar usuário' });
      return;
    }

    res.status(200).json(person);
  } catch(e) {
    res.status(500).json({ error: e });
  }
})

// deletar um dado
router.delete('/delete/:id', async(req, res) => {

  const id = req.params.id; // obtendo id da url

  const person = await Person.findOne({ _id: id }); // buscando pelo '_id' do Atlas
    
  if(!person) {
    res.status(422).json({message: 'Usuário não encontrado'});
    return;
  }

  try {
    const delete_person = await Person.deleteOne({_id: id});
    res.status(200).json({message: 'Usuário removido com sucesso!'});
  } catch(e) {
    res.status(500).json({error:e});
  }
})

module.exports = router;