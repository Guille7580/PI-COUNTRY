import React from "react";
import Card from "../card/card";
import { Link } from 'react-router-dom';
import style from './cards.module.css'

export default function Cards ({currentCountries}) {

    //console.log('paginado ' , currentCountries)

    return(
        <div className={style.cards}>  
          
                {currentCountries?.map( el => 
                        <div key={el.id}>
                            <Link to={'/detalles/'+ el.id} >
                                <Card id={el.id} name={el.name} flagimg={el.flagimg ? el.flagimg : el.flagimg } region={el.region} />
                            </Link>
                        </div>
                )}
                
        </div>

    )
}