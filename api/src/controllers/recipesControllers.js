const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Recipe, Diet } = require("../db");

//GET /recipes?name="..."
const getAllRecipesFromDb = async (name) => {
  if (!name) {
    return await Recipe.findAll();
  } else {
    return await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });
  }
};

const getAllRecipesFromApi = async (name) => {
  const response = await axios.get(
    `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const recipeAll = response.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      instructions: e.instructions,
      likes: e.aggregateLikes,
      diets: e.diets,
    };
  });
  if (name) {
    const nameRecipe = recipeAll.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    return nameRecipe;
  }
  return recipeAll;
};

const getAllRecipes = async (req, res) => {
  const { name } = req.query;
  const apiRecipes = await getAllRecipesFromApi(name);
  const dbRecipes = await getAllRecipesFromDb(name);
  const response = apiRecipes.concat(dbRecipes);
  if (response.length === 0) {
    res.json({ msg: "No se encontro ninguna receta con ese nombre" });
  }
  res.json(response);
};

//GET /recipes/{idReceta}:
const isUUID = (id) => {
  return id.length > 10;
};

const getRecipeByIdFromDb = async (id) => {
  const response = await Recipe.findOne({
    where: {
      id: id,
    },
  });
  return response;
};

const getRecipeByIdFromApi = async (id) => {
  const response = await axios.get(
    `${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`
  );
  const recipeID = {
    id: response.data.id,
    name: response.data.title,
    summary: response.data.summary,
    healthScore: response.data.healthScore,
    instructions: response.data.instructions,
    likes: response.data.aggregateLikes,
    diets: response.data.diets,
  };
  return recipeID;
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  if (!id){
    res.json({ msg: "El ID no existe" })
  } else {
    if (isUUID(id)){
      const recipeDb = await getRecipeByIdFromDb(id);
      res.json(recipeDb);
    } else {
      const recipeApi = await getRecipeByIdFromApi(id);
      res.json(recipeApi);
    }

  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};