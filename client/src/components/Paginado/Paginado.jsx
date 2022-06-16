import React from "react";
import style from "./paginado.module.css";

const Paginado = ({recipePage, recipes, paginate, actualPage, previousPage, nextPage}) =>{
    const pagNumber = [];
    for (var i = 1; i <= Math.ceil(recipes/recipePage); i++){
        pagNumber.push(i);
    }

    return(
        <div className={style.container}>
            <nav className={style.nav}>
                <ul className={style.ul}>
                    <button className={actualPage === "Previous" ? style.actualButton : style.button} onClick={previousPage}> Previous </button>
                    {
                        pagNumber && pagNumber.map(el => (
                            <li className={style.li} key={el}>
                                <button className={actualPage === el ? style.actualButton : style.button} onClick={()=>paginate(el)}>
                                    {el}
                                </button>
                            </li>
                        ))
                    }
                <button className={actualPage === "Next" ? style.actualButton : style.button} onClick={nextPage}> 
                     Next
                </button>
                </ul>
            </nav>
        </div>
    )
}

export default Paginado;