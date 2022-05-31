const axios = require('axios');
const {Router} = require('express');
const {Recipe, Diet} = require('../db.js');
const { getAllDiets } = require('../controllers/dietControllers.js')

const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get('/', getAllDiets)

module.exports = router;