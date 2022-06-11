import axios from 'axios';
import {GET_ALL_RECIPES, SEARCH_BY_NAME, SEARCH_BY_ID }from './typesActions'

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

// export const searchByName = (name) => {
//     return async function (dispatch){
//         try {
//             let response = await axios.get('http://localhost:3001/recipes/?name=' + name)
//             if (response.data.message){
//                 alert (response.data.message)
//             } else {
//             return dispatch({
//                 type: SEARCH_BY_NAME,
//                 payload: response.data
//             })}
//         } catch(err){
//             console.log(err)
//         }
//     }
// }
