const { Op, UUIDV4 } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Recipe, Diet } = require("../db");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

//GET /recipes?name="..."
const getAllRecipesFromDb = async (name) => {
  if (!name) {
    return await Recipe.findAll();
  } else {
    return await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
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
      image:e.image,
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
    next (error)
  }
};

//GET /recipes/{idReceta}:
// const isUUID = (id) => {
//   return id.length > 6;
// };

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
    image: response.data.image,
    summary: response.data.summary,
    healthScore: response.data.healthScore,
    instructions: response.data.instructions,
    likes: response.data.aggregateLikes,
    diets: response.data.diets,
  };
  return recipeID;
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
     res.json({ msg: "El ID no existe" });
   } else {
     // if (isUUID(id)) {
       if (uuidValidate(id)) {
       const recipeDb = await getRecipeByIdFromDb(id);
       res.json(recipeDb);
     } else {
       const recipeApi = await getRecipeByIdFromApi(id);
       res.json(recipeApi);
     }
   }
      } catch (error) {
    next(error)
  }
};

// POST /recipe:
/*Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
 Crea una receta en la base de datos
 */

const createNewRecipe = async (req, res) => {
  const { name, summary, healthScore, instructions, aggregateLikes, diets, image } = req.body;
  try {
    if (!name || !summary) {
      res.json({ msg: "Falta ingresar nombre o resumen de la receta" });
    }
    const nameController = await Recipe.findOne({
      where:{
        name: name,
      }
    })
    if (nameController){
      res.json({ msg: "La receta creada ya existe en la base de datos" });
    } else {
      const newRecipe = await Recipe.create({
          id: uuidv4(),
          name: name,
          image: image,
          summary: summary,
          instructions: instructions,
          healthScore: healthScore,
          aggregateLikes: aggregateLikes,
          diets: diets,
      });
      res.json(newRecipe)
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createNewRecipe,
};

// const createRecipeFromFormFront = async (id, name, summary, healthScore, instructions, aggregateLikes, diets) => {
//    const [newRecipe, created] = await Recipe.findOrCreate({
//       where: {
//           id: id,
//           name: name,
//       },
//       defaults: {
//        summary: summary,
//         healthScore: healthScore,
//         instructions: instructions,
//         aggregateLikes: aggregateLikes,
//         diets: diets,
//       }
//   })

//   const newRecipe = await Recipe.create({
//     id: uuidv4(),
//     name,
//     summary,
//     healthScore,
//     instructions,
//     aggregateLikes,
//     diets
//   })
//   // console.log(created)
//   // console.log(newRecipe.toJSON())
//   return newRecipe;
// };


// const createNewRecipe = async (req, res) => {
//   const { name, summary, healthScore, instructions, aggregateLikes, diets } =
//     req.body;
//   try {
//     if (!name || !summary) {
//       res.json({ msg: "Falta ingresar nombre o resumen de la receta" });
//     }
//     const idNew = uuidv4()
//     const [newRecipe, created] = await Recipe.findOrCreate({
//       where: {
//         id: idNew,
//         name: name,
//       },
//       defaults: {
//         summary: summary,
//         instructions: instructions,
//         healthScore: healthScore,
//         aggregateLikes: aggregateLikes,
//         diets: diets,
//       },
//     });
//     const idController = await Recipe.findOne({
//       where: {
//         id: id,
//       },
//     });
//     if (idController === Recipe.id) {
//       res.json({ msg: "La receta creada ya existe en la base de datos" });
//       console.log("cual es tu nombre maldita receta?:  ", name);
//     } else {
//       res.json(newRecipe);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };