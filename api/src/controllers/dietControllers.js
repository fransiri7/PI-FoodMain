const axios = require("axios");
require("dotenv").config();
const { ALL_RECIPES } = process.env;
const { Recipe, Diet } = require("../db");

/* GET /types:
Obtener todos los tipos de dieta posibles
 En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular:
 
 */
 const loadDietsInDbIfNotExist = async () => {
    const dietsFromApi = [
      "vegetarian",
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan",
      "paleolithic",
      "primal",
      "whole 30",
      "pescatarian",
      "ketogenic",
      "fodmap friendly"
  ]
    const diets = await Diet.findAll();
    if (diets.length === 0){
      dietsFromApi.forEach (async (el) => {
        await Diet.create({
          name: el,
        })
      })
    }
    return dietsFromApi;
  };


  const getAllDiets = async (req, res) => {
    // const {name} = req.body
    const allDiet = await loadDietsInDbIfNotExist()
    console.log(allDiet)
    res.json(allDiet)
  };



module.exports = {
  loadDietsInDbIfNotExist,
  getAllDiets,
  };