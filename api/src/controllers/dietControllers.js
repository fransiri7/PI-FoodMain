const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
// const { router } = require("../app");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
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
    "fodmap friendly",
  ];
  const diets = await Diet.findAll();
  if (diets.length === 0) {
    dietsFromApi.forEach(async (el) => {
      await Diet.create({
        id: uuidv4(),
        name: el,
      });
    });
  }
  return dietsFromApi;
};

const getAllDiets = async (req, res) => {
  //  const {name} = req.body
  const allDiet = await loadDietsInDbIfNotExist();
  res.json(allDiet);
};

module.exports = {
  loadDietsInDbIfNotExist,
  getAllDiets,
};



// PRUEBAAA 
//const loadDietsInDbIfNotExist = async () => {
  //   try{
    //       let dietTypes = []
    //       const types = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
    //       const promesas = types.data.results.diets?.map((el) =>{
      //         console.log('estas serian las promesas:  ',promesas)
//           return new Promise( async (resolve, reject) => {
  //               let dietFound = await Diet.findAll({
//                   where: {
  //                       name: el,
  //                   }
  //               })
  //               let typeDb; 
  //               if(dietFound.length){
    //                   typeDb = dietFound[0]
    //               } else {
      //                   typeDb = await Diet.create({
        //                       id: uuidv4(),
        //                       name: el,
        //                   })
        //               }
        //               resolve(
          //                   dietTypes.push(typeDb)
          //               )
          //               reject(err => next(err))
          //           })
          //       })
          //       await Promise.all(promesas)
          //      return dietTypes
          //   } catch (error){
            //       console.log(error)
            //   }    
            // };

// const getAllDiets = async (req, res) => {
//   const allDiet = await loadDietsInDbIfNotExist();
//   res.json(allDiet);
            // module.exports = {
            //   loadDietsInDbIfNotExist,
            //   getAllDiets,
            // };
// };