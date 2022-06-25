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

//useSelector = nos carga en una variable el estado de dietas
//useEffect = cuanbdo se monta el componetne hace lo que le estes pidiendo adentro, es decir te metes al componente y le podes poner una condicion
//useD

const FilterAndOrder = () => {
  const typeState = useSelector((state) => state.diets);
  const {dietTypes, order, filterApiDb} = useSelector((state) => state.filter);
  let dispatch = useDispatch();

  useEffect(() => {
    if (!typeState.length) {
      dispatch(getAllTypes());
    }
  }, [dispatch, typeState.length]);
  
  function backToHome() {
    dispatch(getAllRecipes());
  }
  


  function onFilterChange(e) {
    e.preventDefault();
    if (e.target.name === "selectDiet"){
      dispatch(filter( {dietTypes: e.target.value, order: order, filterApiDb: filterApiDb } ))
    } 
    if (e.target.name === "filterApiDb"){
      dispatch(filter( {dietTypes: dietTypes, order: order, filterApiDb:  e.target.value } ))
    }

  }

  function onOrderChange(e) {
    e.preventDefault();
    dispatch(orderRecipe(e.target.value));
  }

 return (
    <div className={style.container}>
      <select value={order} onChange={onOrderChange}>
        <option value="defaultOrder"> Order </option>
        <option value="A-Z"> Sort from A-Z </option>
        <option value="Z-A"> Sort from Z-A</option>
        <option value="score-asc"> Sort by score ascendant</option>
        <option value="score-des"> Sort by score descendant</option>
      </select>

      <select name="selectDiet" value={dietTypes} onChange={onFilterChange}>
        <option value="All"> Filter by types </option>
        {typeState?.map((diet, index) => {
          return (
            <option key={index} value={diet}>
              {capitalizeLetter(diet)}
            </option>
          );
        })}
      </select>
      
      <select name="filterApiDb" value={filterApiDb} onChange={onFilterChange}>
        <option value="filterAll"> All recipes</option>
        <option value="filterApi"> API recipes</option>
        <option value="filterDb"> Recipes created </option>
      </select>
      
      <button onClick={backToHome} className={style.button}>Reset recipes</button>
    </div>
  );
};

export default FilterAndOrder;
