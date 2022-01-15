import React from 'react';
import {Link} from 'react-router-dom';
import style from './inicio.module.css'

export default function LandingPage () {
    return (
        <div className={style.inicio}>
            <div className={style.card} >

               <Link className={style.btnInicio} to="/home">BIENVENIDO</Link>
               {/* <h1>Informacion de Paises</h1>
               <Link to = '/home'>
                   <button>Ingresar</button>
               </Link> */}
            </div>
        </div>
    )
}