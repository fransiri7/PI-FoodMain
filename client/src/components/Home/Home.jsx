import { React, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllRecipes } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder";
import CardRecipes from "../CardRecipes/CardRecipes";
import style from './home.module.css'


const Home = () => {
  const allRecipes = useSelector((state) => state.allRecipes)
  const dispatch = useDispatch()
 
  useEffect(()=>{
    if (!allRecipes.length){
      dispatch(getAllRecipes())
    }
  }, [allRecipes.length, dispatch])
  return (
    <div className={style.container}>
        <Navbar/>
        <FilterAndOrder/>
        <div className={style.containerCards}>
     {allRecipes?.length ? (
            allRecipes.map((el) => {
              return <CardRecipes name={el.name} image={el.image} healthScore={el.healthScore} diets={el.diets} id={el.id} key={el.id}/>;
            })
          ) : (
           <span className={style.span}> No recipe found with that name </span>
          )}
           
        </div>
    </div>
  );
};

export default Home;