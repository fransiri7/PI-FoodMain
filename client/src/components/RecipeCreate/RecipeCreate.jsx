import { useEffect } from "react";
import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import style from "./recipeCreate.module.css";
import { createRecipe, getAllTypes } from "../../redux/actions";
import { useState } from "react";
import { capitalizeLetter } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";


const RecipeCreate = () => {
  
  function validate(input) {
    let error = {};
    if (!input.name) {
      error.name = "Recipe name is required";
    } else if (input.name.length < 8) {
      error.name = "Input must contain at least 8 characters";
    }
    if (!input.summary) {
      error.summary = "Summary is required";
    }
    if (!input.aggregateLikes) {
      error.aggregateLikes = "Likes is required";
    } else if (input.aggregateLikes < 0 || input.aggregateLikes > 15000) {
      error.aggregateLikes =
        "Should contain a number greater than zero and less than 15.000";
    }
    if (!input.score) {
      error.score = "Healty Score is required";
    } else if (input.score < 0 || input.score > 100) {
      error.score = "The number must be greater than 0 and less than 100";
    }
    if (!input.instructions) {
      error.instructions = "Instructions is required";
    }
    if (!input.image) {
      error.image = "Image value is required";
    } else if (typeof input.image !== "string") {
      error.image = "Please enter the correct url";
    }
    if (typeDiet.length === 0) {
      error.diets = "Must contain at least 1 type of diet";
    }
    return error;
  }
  
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!diets.length) {
      dispatch(getAllTypes());
    }
  }, [diets.length, dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    aggregateLikes: "",
    score: "",
    instructions: "",
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    summary: "",
    aggregateLikes: "",
    score: "",
    instructions: "",
  });

  const [typeDiet, setTypeDiet] = useState([]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prevState) => {
      // prevState devuelve un nuevo estado, solo es otro tipo de sintaxis
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
        diets: typeDiet,
      };
      dispatch(createRecipe(body));
      setInput({
        name: "",
        image: "",
        summary: "",
        aggregateLikes: "",
        score: "",
        instructions: "",
      });
      navigate("/home");
      } else {
      alert("Please complete all fields");
    }
  }

  function onChangeCheckBox(e) {
    let arrayDiets = [];
    if (!typeDiet.includes(e.target.name)) {
      arrayDiets = typeDiet.concat(e.target.name);
      let validateError = { ...error };
      delete validateError.diets;
      setError(validateError);

      if (arrayDiets.length > 5) {
        alert(" You cannot select more than 5 types of diets");
        arrayDiets.pop();
        e.target.checked = false;
      }
    } else {
      arrayDiets = typeDiet.filter((el) => e.target.name !== el);
    }
    setTypeDiet(arrayDiets);
    }

  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.div1}>
        <div className={style.div2}>
          <header className={style.font}> Create your own recipe!</header>
        </div>
        <form onSubmit={handleSubmit} className={style.div3}>
          <div className={style.div4}>
            <div className={style.div5}>
              <label className={style.font}> Name: </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className={error?.name && style.inputDanger}
              />
              <span className={error?.name && style.spanDanger}>
                {error.name || ""}
              </span>

              <label className={style.font}> Image: </label>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={handleChange}
              />
              <span className={error?.image && style.spanDanger}>
                {error.image || ""}
              </span>

              <label className={style.font}> Summary: </label>
              <input
                type="text"
                name="summary"
                value={input.summary}
                onChange={handleChange}
              />
              <span className={error?.summary && style.spanDanger}>
                {error.summary || ""}
              </span>

              <label className={style.font}> Likes: </label>
              <input
                type="number"
                name="aggregateLikes"
                value={input.aggregateLikes}
                onChange={handleChange}
              />
              <span className={error?.aggregateLikes && style.spanDanger}>
                {error.aggregateLikes || ""}
              </span>

              <label className={style.font}> Healthy Score: </label>
              <input
                type="number"
                name="score"
                value={input.score}
                onChange={handleChange}
              />
              <span className={error?.score && style.spanDanger}>
                {error.score || ""}
              </span>

              <label className={style.font}> Instructions: </label>
              <input
                type="text"
                name="instructions"
                value={input.instructions}
                onChange={handleChange}
              />
              <span className={error?.instructions && style.spanDanger}>
                {error.instructions || ""}
              </span>
            </div>
            <div className={style.div6}>
              <span className={style.font} >Diet Types</span>
              <span className={error?.diets && style.spanDanger}>
                {error.diets || ""}
              </span>
              <div className={style.div7}>
                <div className={style.div8}>
                {diets?.map((diet, index) => {
                  return (
                    <div className={style.checkboxYLabel} key={index}>
                      <input
                        type="checkbox"
                        name={diet}
                        onChange={onChangeCheckBox}
                      />
                      <label>{capitalizeLetter(diet)}</label>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
          <div className={style.buttonContainer}>
            <button type="submit" className={style.button}> 
              Create Recipe
            </button>
          </div>
        </form>
      </div>
      <Link to="/home">
        <button className={style.button}> Back to Home </button>
      </Link>
    </div>
  );
};
  
export default RecipeCreate;
