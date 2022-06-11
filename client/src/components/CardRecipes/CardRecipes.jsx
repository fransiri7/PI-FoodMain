import { React } from "react";
import style from "./cardRecipes.module.css";
import { Link } from "react-router-dom";
import { capitalizeLetter } from "../../utils/utils";

const CardRecipes = ({ name, image, healthScore, diets, id }) => {
  return (
    <div className={style.container}>
      <img className={style.imgContainer} src={image} alt="pic" />

      <Link to={"/recipe/detail/" + id} className={style.name}>
        {name}
      </Link>

      <div className={style.diets}>
        <h3>Types diets</h3>

        <p>
          {diets?.length ? (
            diets.map((diet) => {
              return <li  key={diet}>{capitalizeLetter(diet)} </li>;
            })
          ) : (
            <span>no diets</span>
          )}
       
        </p>
      </div>

      <h3 className={style.score}>Score N° {healthScore}</h3>
     
    </div>
  );
};

export default CardRecipes;
