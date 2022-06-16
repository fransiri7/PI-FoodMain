import {
  GET_ALL_RECIPES,
  SEARCH_BY_ID,
  FILTER_TYPE_DIETS,
  GET_ALL_TYPES,
  ORDER_RECIPES,
  CREATE_RECIPES
} from "./typesActions";

const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  recipeDetail: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
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

    case FILTER_TYPE_DIETS:
      const filter = [...state.allRecipes];
      const arrDietType = [];
      if (payload !== 'All'){
        for (var i = 0; i < filter?.length; i++){
          for (var j = 0; j < filter[i].diets?.length; j++){
            if (filter[i].diets[j].name === payload){
              arrDietType.push(filter[i])
              }
          }
        }
        return {
          ...state,
          recipes: arrDietType,
        }
      } 
      return {
        ...state,
        recipes: filter,
      }

      case ORDER_RECIPES:
        const sortRecipe = [...state.recipes]
        if(payload === 'A-Z' || payload === 'Z-A'){
          sortRecipe.sort(function(a,b){
              if(a.name < b.name){
                  return payload === 'A-Z' ? -1 : 1;
              }
              if (a.name > b.name){
                  return payload === 'A-Z' ? 1 : -1;
              }
              return 0;
          })
      } else if (payload === 'score-asc' || payload === 'score-des') {
        sortRecipe.sort(function(a,b){
            if(a.healthScore < b.healthScore){
                return payload === 'score-asc' ? -1 : 1;
            }
            if (a.healthScore > b.healthScore){
                return payload === 'score-asc' ? 1 : -1;
            }
            return 0;
        })
    }
    return {
      ...state,
      recipes: sortRecipe,
    }

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
