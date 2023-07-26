const router = require('express').Router(); // chamando o Router do Express
const Person = require('../models/Person'); // importando o model

router.post('/', async(req, res) => {
  
  const {name, salary, approved} = req.body;
  
  if(!name) {
    res.status(422).json({error:'O nome é obrigadtório!'});
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

router.get('/', (req, res) => {
  res.json({message:'Hello World!'});
})

module.exports = router;