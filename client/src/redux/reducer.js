import {
  GET_ALL_RECIPES,
  SEARCH_BY_ID,
  FILTER,
  GET_ALL_TYPES,
  ORDER_RECIPES,
  CREATE_RECIPES,
} from "./typesActions";
import { validate as uuidValidate } from "uuid";

const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  recipeDetail: {},
  filter: {
    dietTypes: "All",
    order: "defaultOrder",
    filterApiDb: "filterAll"
  },
};

function orderFilters(array, payload) {
  const sortedRecipes = [...array];
  if (payload === "A-Z") {
    sortedRecipes.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }
  if (payload === "Z-A") {
    sortedRecipes.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  }
  if (payload === "score-asc") {
    sortedRecipes.sort((a, b) => {
      return a.healthScore - b.healthScore;
    });
  }
  if (payload === "score-des") {
    sortedRecipes.sort((a, b) => {
      return b.healthScore - a.healthScore;
    });
  }
  return sortedRecipes;
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
        filter: { dietTypes: "All", order: "defaultOrder", filterApiDb: "filterAll" },
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        recipeDetail: payload,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        diets: payload,
      };

    case FILTER:
      function filterByTypes(recipes, dietTypes) {
        if (dietTypes === "All") {
          return recipes;
        } else {
          let filterRecipes = recipes.filter((recipe) =>
            recipe.diets?.find((el) => el.name === dietTypes)
          );
          return filterRecipes;
        }
      }

      function filterByRecipeApiOrDb (recipes, filterApiDb){
        if (filterApiDb === "filterAll"){
            return recipes
        } else {
        if (filterApiDb === "filterApi"){
            let filterApi = recipes.filter(el => !uuidValidate(el.id))
            return filterApi;
        } else if (filterApiDb === "filterDb"){
            let filterDb = recipes.filter(el => uuidValidate(el.id))
            return filterDb;
        }
        }
      }

      const recipesFilterByTypes = filterByTypes(
        state.allRecipes,
        payload.dietTypes
      );

      const recipesFilterByApiOrDb = filterByRecipeApiOrDb(
        recipesFilterByTypes,
        payload.filterApiDb
      )

      
      let order = orderFilters(recipesFilterByApiOrDb, state.filter.order,);
      return {
        ...state,
        recipes: order,
        filter: {
          ...state.filter,
          dietTypes: payload.dietTypes,
          filterApiDb: payload.filterApiDb
        },
      };
 
    case ORDER_RECIPES:
      let orderRecipe = orderFilters(state.recipes, payload);
      return {
        ...state,
        recipes: orderRecipe,
        filter: {
          ...state.filter,
          order: payload,
        },
      };
    case CREATE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.concat(payload),
        allRecipes: state.recipes.concat(payload),
      };

    default:
      return {
        ...state,
      };
  }
}
