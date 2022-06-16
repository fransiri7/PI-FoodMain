import { useEffect } from "react";
import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import style from "./recipeCreate.module.css";
import { createRecipe, getAllTypes } from "../../redux/actions";
import { useState } from "react";

const RecipeCreate = () => {
  function validate(input) {
    let error = {};
    if (!input.name) {
      error.name = "Recipe name is required";
    } else if (input.name.length < 8) {
      error.name = "Input must contain at least 8 characters";
    }
    if(!input.summary) {
      error.summary = 'Summary is required'
    }
    if(!input.likes) {
      error.likes = 'Likes is required'
    } else if ( input.likes < 0 ) {
      error.likes = 'Should contain a number greater than zero'
    }
    if(!input.score) {
      error.score = 'Healty Score is required'
    } else if (input.score < 0 || input.score > 100) {
      error.score = 'The number must be greater than 0 and less than 100'
    }
    if(!input.instructions) {
      error.instructions = 'Instructions is required'
    }
    if(!input.image) {
      error.image = 'Image value is required'
    } else if (typeof input.image !==  'string') {
      error.image = 'Please enter the correct url'
    }
    if(diets.length === 0) {
      error.diets = 'Must contain at least 1 type of diet'
    }
    return error;
  }

  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!diets.length) {
      dispatch(getAllTypes());
    }
  }, [diets.length, dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    likes: "",
    score: "",
    instructions: "",
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    summary: "",
    likes: "",
    score: "",
    instructions: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setInput((prevState) => { // prevState devuelve un nuevo estado, solo es otro tipo de sintaxis
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState));
      return newState;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      let body = {
        ...input,
        diets: diets,
      };
      dispatch(createRecipe(body));
      setInput({
        name: "",
        image: "",
        summary: "",
        likes: "",
        score: "",
        instructions: "",
      });
    } else {
      console.log("Errrrrrror");
    }
  }

  return (
    <div className={style.container}>
      <div>
        <Navbar />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label> Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              className={error?.name && style.inputDanger}
            />
            <span className={error?.name && style.spanDanger}>{error.name || ""}</span>
          </div>
          <br />
         
          <div>
          <label> Image: </label>
          <input type="text" name="image" value={input.image} onChange={handleChange}/>
          <span className={error?.image && style.spanDanger}>{error.image || ""}</span>
          </div>
          <br />
          
          <div>
          <label> Summary: </label>
          <input type="text" name="summary" value={input.summary} onChange={handleChange}/>
          <span className={error?.summary && style.spanDanger}>{error.summary || ""}</span>
          </div>
          <br />
          
          <div>
          <label> Likes: </label>
          <input type="number" name="likes" value={input.likes} onChange={handleChange}/>
          <span className={error?.likes && style.spanDanger}>{error.likes || ""}</span>
          </div>
          <br />
         
          <div>
          <label> Healty Score: </label>
          <input type="number" name="score" value={input.score} onChange={handleChange}/>
          <span className={error?.score && style.spanDanger}>{error.score || ""}</span>
          </div>
          <br />
          
          <div>
          <label> Instructions: </label>
          <input type="text" name="instructions" value={input.instructions} onChange={handleChange}/>
          <span className={error?.instructions && style.spanDanger}>{error.instructions || ""}</span>
          </div>
          <br />
          
          <div>
          <label> Types Diets </label>
          <select>
            <option value="diets"> All </option>
          </select>
          </div>
   
          <br />
          <input type="submit" value="Create Recipe" />
        </form>
      </div>
    </div>
  );
};

export default RecipeCreate;