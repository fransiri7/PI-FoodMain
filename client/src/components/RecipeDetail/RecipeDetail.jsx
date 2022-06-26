import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchById } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import style from "./recipeDetail.module.css";
import { capitalizeLetter } from "../../utils/utils";
import { validate as uuidValidate } from "uuid";

const RecipeDetail = () => {
  
  const params = useParams();
  let id = params.id;
 
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchById(id));
  }, [dispatch, id]);
  if (!recipeDetail.id) {
    return <span className={style.span}> Recipe not found </span>;
  }

  return (
    <div className={style.container}>
      <div>
        <Navbar />
      </div>
      <div className={style.containerDetail}>
        <div className={style.name}>
          <h1> {recipeDetail.name} </h1>
        </div>
        <div className={style.img}>
          <img src={recipeDetail.image} alt="img not found" />
        </div>
        <div className={style.id}>
          <h3>ID: {recipeDetail.id}</h3>
        </div>
        <div className={style.likeAndScore}>
          <h2 className={style.aggregateLikes}>
            {" "}
            Likes: {recipeDetail.aggregateLikes}
          </h2>
          <h2 className={style.healthScore}>
            {" "}
            Health Score: {recipeDetail.healthScore}
          </h2>
        </div>
        <div className={style.diets}>
          <h2 style={{ textDecorationLine: "underline" }}>
            {recipeDetail.diets.length > 1 ? "Types diets: " : "Type: "}
          </h2>
          <ul>
            {recipeDetail.diets?.map((diet, index) => {
              return (
                <li key={index.id}>
                  <h4>{capitalizeLetter(diet.name)}</h4>{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.summary}>
          <h2>Summary</h2>
          <p> {recipeDetail.summary} </p>
        </div>
        <div className={style.instructions}>
          <h2>Instructions: </h2>
          {recipeDetail.instructions.length > 1 &&
          !uuidValidate(recipeDetail.id) ? (
            recipeDetail?.instructions?.map((step, number) => {
              return (
                <div>
                  <p
                    key={number.number}
                    style={{
                      textDecorationLine: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Number Step {number + 1}:
                  </p>
                  <p>{step.step}</p>
                </div>
              );
            })
          ) : uuidValidate(recipeDetail.id) ? (
            <h4> {recipeDetail.instructions}</h4>
          ) : (
            <h4> This recipe doesn't instructions </h4>
          )}
        </div>
        <Link to="/home">
          <button className={style.button}>Back to home </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
