import { React } from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllRecipes } from "../../redux/actions";



const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {  
    dispatch(getAllRecipes())  
  },[dispatch])
  return (
    <div className={style.landing}>
      <div >
        <h1 className={style.title}>Welcome to HenryFood!</h1>
      </div>
      <div >
       <Link to='/home'> <button className={style.button}> ENTER </button> </Link> 
      </div>
    </div>
  );
};

export default LandingPage;
