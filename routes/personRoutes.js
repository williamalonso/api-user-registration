const router = require('express').Router(); // chamando o Router do Express
const personController = require('../controllers/personController'); // importando controller

// Rota para criar uma nova pessoa
router.post('/', personController.createPerson);

// Rota para listar todas as pessoas
router.get('/getusers', personController.getPeople);

// Rota para obter uma pessoa por ID
router.get('/:id', personController.getPersonById);

// Rota para atualizar uma pessoa por ID
router.patch('/update/:id', personController.updatePersonById);

// Rota para excluir uma pessoa por ID
router.delete('/delete/:id', personController.deletePersonById);

module.exports = router;