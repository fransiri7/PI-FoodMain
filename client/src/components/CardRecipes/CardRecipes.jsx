import { React } from "react";
import style from "./cardRecipes.module.css";
import { Link } from "react-router-dom";
import { capitalizeLetter } from "../../utils/utils";

const CardRecipes = ({ name, image, healthScore, diets, id }) => {
  return (
    <div className={style.container}>
      <Link to={"/recipe/detail/" + id} >
     
      <img className={style.imgContainer} src={image} alt="image not found" />

        <div className={style.name}>
        {name}

        </div>
      </Link>

      <div className={style.diets}>
        <h3>Types diets</h3>

        <p>
          {diets?.length ? (
            diets.map((diet, index) => {
              return <li  key={index}>{capitalizeLetter(diet)} </li>;
            })
          ) : (
            <span>no diets</span>
          )}
       
        </p>
      </div>

      <h3 className={style.score}> Healty Score N° {healthScore}</h3>
     
    </div>
  );
};

export default CardRecipes;
