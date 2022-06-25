import axios from "axios";
import {
  GET_ALL_RECIPES,
  SEARCH_BY_ID,
  FILTER,
  GET_ALL_TYPES,
  ORDER_RECIPES,
  CREATE_RECIPES,
} from "./typesActions";

export const getAllRecipes = (name) => {
  return function (dispatch) {
      axios.get(`http://localhost:3001/recipes/?name=${name ? name : ""}`)
      .then((recipes) => {
        if (recipes.data.msg){
            alert (recipes.data.msg)
        } else {
            dispatch({
              type: GET_ALL_RECIPES,
              payload: recipes.data,
            });

        }
        
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchById = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3001/recipes/" + id);
      dispatch({
        type: SEARCH_BY_ID,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3001/types");
      dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filter = (name) => {
  return {
    type: FILTER,
    payload: name,
  };
};

export const orderRecipe = (name) => {
  return {
    type: ORDER_RECIPES,
    payload: name,
  };
};

export const createRecipe = (body) => {
  return async function (dispatch) {
    try {
      let response = await axios.post("http://localhost:3001/recipes/", body);
      if (response.data.message) {
        alert(response.data.message);
      } else {
        dispatch({
          type: CREATE_RECIPES,
          payload: response.data,
        });
        alert("Recipe created successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
