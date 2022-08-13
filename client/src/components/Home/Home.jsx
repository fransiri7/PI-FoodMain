import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, clear } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder";
import CardRecipes from "../CardRecipes/CardRecipes";
import Paginado from "../Paginado/Paginado";
import style from "./home.module.css";

const Home = () => {
  const recipes = useSelector((state) => state.recipes);
  const allRecipes = useSelector((state) => state.allRecipes);
  const dispatch = useDispatch();

  // ----------------------- Paginado -------------------------

  const [actualPage, setActualPage] = useState(1);
  const recipePage = 9;
  const lastRecipeIndex = actualPage * recipePage;
  const firstRecipeIndex = lastRecipeIndex - recipePage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  const paginate = (numberPag) => {
    setActualPage(numberPag);
  };

  function previousPage() {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  }

  function nextPage() {
    const lastPage = Math.ceil(recipes.length / recipePage);
    if (actualPage < lastPage) {
      setActualPage(actualPage + 1);
    }
  }
  // ------------------------------------------------------------

  
 
  useEffect(() => {
    dispatch(clear());
    if (!allRecipes.length) {
      dispatch(getAllRecipes());
    }
    const lastPage = Math.ceil(recipes.length / recipePage);
    if (actualPage > lastPage) {
      setActualPage(1);
    }
  }, [recipes.length, dispatch, actualPage]);

  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.filter}>
        <FilterAndOrder />
      </div>
      <div>
        <Paginado
          recipePage={recipePage}
          recipes={recipes.length}
          paginate={paginate}
          actualPage={actualPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
      <div className={style.containerCards}>
        {currentRecipes?.length ? (
          currentRecipes.map((el) => {
            return (
              <CardRecipes
                name={el.name}
                image={el.image}
                healthScore={el.healthScore}
                diets={el.diets}
                id={el.id}
                key={el.id}
              />
            );
          })
        ) : (
          <span className={style.span}> No recipes found ... </span>
        )}
      </div>
    </div>
  );
};

export default Home;
