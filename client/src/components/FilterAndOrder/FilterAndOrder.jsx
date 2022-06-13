//Filtrar por tipo de dietas
//Ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions";
import { capitalizeLetter } from "../../utils/utils";


const FilterAndOrder = ({allRecipes}) => {
const type = useSelector((state) => state.diets)
console.log ( 'que tengo??:', type)
let dispatch = useDispatch()
  const { diets } = useSelector((state) => state.filter);

  useEffect(()=>{
    if(!type.length){
      dispatch(getAllTypes())
    }
  }, [dispatch, type.length])

  return (
    <div>
      <select value={diets} name='selectDiet' >
        <option value='All'> Filter by types </option>
        {diets?.map((diet, index) => {
          <option key={index} value={diet}>
            {" "}
            {capitalizeLetter(diet)}{" "}
          </option>;
        })}
      </select>
    </div>
  );
};

export default FilterAndOrder;
