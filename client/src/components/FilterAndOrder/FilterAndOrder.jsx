//Filtrar por tipo de dietas
//Ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filter,
  getAllTypes,
  orderRecipe,
  getAllRecipes,
} from "../../redux/actions";
import { capitalizeLetter } from "../../utils/utils";
import style from "./filterAndOrder.module.css";

const FilterAndOrder = () => {
  const typeState = useSelector((state) => state.diets);
  let dispatch = useDispatch();

  function backToHome() {
    dispatch(getAllRecipes());
  }

  useEffect(() => {
    if (!typeState.length) {
      dispatch(getAllTypes());
    }
  }, [dispatch, typeState.length]);

  function onOrderChange(e) {
    e.preventDefault();
    dispatch(orderRecipe(e.target.value));
  }

  function onFilterChange(e) {
    e.preventDefault();
    dispatch(filter(e.target.value));
  }

  return (
    <div className={style.container}>
      <select name="selectOrder" onChange={onOrderChange}>
        <option value="Order"> Order </option>
        <option value="A-Z"> Sort from A-Z </option>
        <option value="Z-A"> Sort from Z-A</option>
        <option value="score-asc"> Sort by score ascendant</option>
        <option value="score-des"> Sort by score descendant</option>
      </select>

      <select name="selectDiet" onChange={onFilterChange}>
        <option value="All"> Filter by types </option>
        {typeState?.map((diet, index) => {
          return (
            <option key={index} value={diet}>
              {capitalizeLetter(diet)}
            </option>
          );
        })}
      </select>
      <button onClick={backToHome} className={style.button}>Reset recipes</button>
    </div>
  );
};

export default FilterAndOrder;
