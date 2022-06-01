const {Router} = require('express');
const axios = require('axios');
const {Recipe, Diet} = require('../db.js');
const { getAllRecipes, getRecipeById, createNewRecipe } = require('../controllers/recipesControllers.js')

const router = Router();

// GET /recipes?name="...":
router.get('/', getAllRecipes);

// GET /recipes/{idReceta}:
router.get('/:id', getRecipeById);

// POST /
router.post('/', createNewRecipe);



// router.use('/', getRecetasFromDb) // a esta ruta la usaremos desde el front cuando le solicite algo a mi base de datos

module.exports = router;
