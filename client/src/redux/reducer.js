import { GET_ALL_RECIPES, SEARCH_BY_NAME, SEARCH_BY_ID } from "./typesActions";

const initialState = {
    allRecipes: [],
    recipes: [],
    diets: [],
    recipeDetail: {},
}

export default function reducer (state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: payload,
                allRecipes: payload,
            }
        case SEARCH_BY_ID:
            return {
                ...state,
                recipeDetail: payload,
            }
        default:
            return {
                ...state
            };    
    }
}