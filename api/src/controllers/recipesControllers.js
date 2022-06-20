const { Op, UUIDV4 } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Recipe, Diet } = require("../db");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

const formatDietsArray = (stringArray) => 
    stringArray.map((item, index) => ({
            id: index,
            name: item
        }
    ))

    const formatInstructionsArray = (instructionArray) => {
      const arrInstruction = []
      for (var i = 0; i < instructionArray?.length; i++){
        for (var j = 0; j < instructionArray[i].steps?.length; j++){
          arrInstruction.push({number: instructionArray[i].steps[j].number, step: instructionArray[i].steps[j].step})
        }
      }
      return arrInstruction;
    }



//GET /recipes?name="..."
const getAllRecipesFromDb = async (name) => {
  if (!name) {
    return await Recipe.findAll({
      include: [
        {
          model: Diet,
        },
      ],
    });
  } else {
    return await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
          
        },
      },
      include: [
        {
          model: Diet,
        },
      ],
    });
  }
};

const getAllRecipesFromApi = async (name) => {
  const response = await axios.get(
    `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const recipeAll = response.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      instructions: formatInstructionsArray(e.analyzedInstructions),
      likes: e.aggregateLikes,
      diets: formatDietsArray(e.diets),
      image: e.image,
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

const getAllRecipes = async (req, res, next) => {
  const { name } = req.query;
  try {
    const apiRecipes = await getAllRecipesFromApi(name);
    const dbRecipes = await getAllRecipesFromDb(name);
    const response = apiRecipes.concat(dbRecipes);
    if (!response.length) {
      res.json({ msg: "No se encontro ninguna receta con ese nombre" });
    } else {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
};

const getRecipeByIdFromDb = async (id) => {
  const response = await Recipe.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Diet,
      },
    ],
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
    image: response.data.image,
    summary: response.data.summary,
    healthScore: response.data.healthScore,
    instructions: formatInstructionsArray(response.data.analyzedInstructions),
    likes: response.data.aggregateLikes,
    diets: formatDietsArray(response.data.diets),
  };
  return recipeID;
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.json({ msg: "El ID no existe" });
    } else {
      if (uuidValidate(id)) {
        const recipeDb = await getRecipeByIdFromDb(id);
        res.json(recipeDb);
      } else {
        const recipeApi = await getRecipeByIdFromApi(id);
        res.json(recipeApi);
      }
    }
  } catch (error) {
    next(error);
  }
};

// POST /recipe:
/*Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
 Crea una receta en la base de datos
 */

const createNewRecipe = async (req, res, next) => {
  const {
    name,
    summary,
    score,
    instructions,
    likes,
    diets,
    image
  } = req.body;
  try {
    // if (!name || !summary) {
    //   res.json({ message: "Missing to enter name or summary of the recipe" });
    // }
    const existantRecipe = await Recipe.findOne({
      where: {
        name: name,
      },
    });
    if (existantRecipe) {
      res.json({ message: "The created recipe already exists in the database" });
    } else {
      const newRecipe = await Recipe.create({
        id: uuidv4(),
        name: name,
        image:image,
        summary: summary,
        instructions: instructions,
        healthScore: score,
        aggregateLikes: likes,
      });
      const promises = diets?.map((diet) => {
        return new Promise(async (resolve, reject) => {
          let foundDiet = await Diet.findOne({
            where: {
              name: diet,
            },
          });
          resolve(newRecipe.addDiet(foundDiet));
          reject((err) => next(err));
        });
      });
      await Promise.all(promises);
      let response = await Recipe.findOne({
        where: {
          id: newRecipe.id,
        },
        include: [
          {
            model: Diet,
          },
        ],
      });
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createNewRecipe,
};
