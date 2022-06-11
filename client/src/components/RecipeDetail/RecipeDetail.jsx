import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchById } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import style from './recipeDetail.module.css'

const RecipeDetail = () => {
  const params = useParams();
  let id = params.id;
  
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchById(id));
  }, [dispatch]);
  console.log(recipeDetail);
  if (!recipeDetail.id) {
    return <span> Searching recipe </span>;
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className={style.name}>
          <h1><u>Recipe:</u> <br/> {recipeDetail.name}</h1>
        </div>
        <div className={style.img}>
          <img src={recipeDetail.image} alt="img not found" />
        </div>
        <div className={style.id}>
          <h3>ID: {recipeDetail.id}</h3>
        </div>
        <div className={style.diets}>
          <h3>{recipeDetail.diets.length > 1 ? "Types diets: " : "Tipo: "}</h3>
          <ul>
            {recipeDetail.diets?.map((diet) => {
              return (
                <li key={diet}>
                  <p>{diet}</p>{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.summary}>
          <h3>Summary</h3>
          <p> {recipeDetail.summary} </p>
        </div>
        <div className={style.aggregateLikes}>
          <h3> Aggregate Likes: {recipeDetail.aggregateLikes}</h3>
        </div>
        <div className={style.healthScore}>
          <h3> Health Score: {recipeDetail.healthScore}</h3>
        </div>
        <div className={style.instructions}>
          <h3>Instructions: </h3>
          <p> {recipeDetail.instructions} </p>
        </div>
      <Link to="/home">
                <button className={style.button} >Back to home </button>
                   
      </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
