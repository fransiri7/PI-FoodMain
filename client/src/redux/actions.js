import axios from 'axios';
import {GET_ALL_RECIPES, SEARCH_BY_ID, FILTER_TYPE_DIETS, GET_ALL_TYPES }from './typesActions'

export const getAllRecipes = (name) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/recipes/?name=${name ? name : ''}`)
        .then((recipes) => {
            dispatch({
                type: GET_ALL_RECIPES,
                payload: recipes.data,
            })
         })
        .catch((error)=>{
            console.log(error);
        })
    }
}

export const searchById = (id) => {
   return async function (dispatch){
        try {
            let response = await axios.get('http://localhost:3001/recipes/' + id)
            dispatch({
                type: SEARCH_BY_ID,
                payload: response.data
            })}
         catch(err){
            console.log(err)
        }
    }
}


export const getAllTypes = () => {
    return async function (dispatch){
         try {
             let response = await axios.get('http://localhost:3001/types')
             dispatch({
                type: GET_ALL_TYPES,
                payload: response.data
             })}
          catch(err){
             console.log(err)
         }
     }
 }


export const filter = (name) => {
    return {
        type: FILTER_TYPE_DIETS,
        payload: name
    }
}
