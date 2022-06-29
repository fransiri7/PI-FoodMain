import { useState } from "react";
import { getAllRecipes} from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from './searchBar.module.css'

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (!search){
        alert ('Insert recipe')
      } else {
        dispatch(getAllRecipes(search));
        setSearch('')
      }
      } catch (error) {
      console.log(error)
    }  
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder=" Insert recipe here" onChange={(e) => onInputChange(e)} value={search} />
        <input type="submit" value="Search" className={style.button}/>
      </form>
    </div>
  );
};

export default SearchBar;
