import { React } from "react";
import { Link } from "react-router-dom";
import style from './navbar.module.css'
import SearchBar from "../SearchBar/SearchBar";
import {useDispatch} from 'react-redux'
import { getAllRecipes } from "../../redux/actions";

const Navbar = () => {
  
  const dispatch = useDispatch()
  function backToHome () {
    dispatch(getAllRecipes())
  }
  
  return (
    <div className={style.container}>
      <div className={style.routes}>
      <Link to='/home'className={style.links}> <p onClick={backToHome}> Home </p> </Link> 
      <Link to='/recipe/create' className={style.links}> <p> Create Recipe</p> </Link> 
      </div>
      
        <h1>HENRY FOOD</h1>
      <SearchBar/>
  
    </div>
  );
};

export default Navbar;

