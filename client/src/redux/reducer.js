import {
  GET_ALL_RECIPES,
  SEARCH_BY_ID,
  FILTER_TYPE_DIETS,
  GET_ALL_TYPES,
} from "./typesActions";

const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  recipeDetail: {},
  filter: {
    types: "All",
  },
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
        filter: {
          types: "All",
        },
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        recipeDetail: payload,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        types: payload,
      };

    case FILTER_TYPE_DIETS:
      function filterTypeDiets(recipes, diet) {
        console.log("que tipo de all recipes soy??:   ", recipes);
        if (diet === "All") {
          return recipes;
        } else {
          return recipes.filter((recipe) => {
            recipe.diets.includes(diet);
          });
        }
      }
      const recipeFilterByDiet = filterTypeDiets(
        state.allRecipes,
        payload.diet
      );

      return {
        ...state,
        filter: {
          ...state.filter,
          type: recipeFilterByDiet,
        },
      };
    default:
      return {
        ...state,
      };
  }
}
