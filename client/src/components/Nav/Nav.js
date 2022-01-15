import React from 'react';
import s from './Nav.module.css'
import { Link }from 'react-router-dom'
import logo from '../../imagen/logo.png';

export default function Nav({nav}) {
    return (
        <div className={s.contenido}>
            <div className={s.img}>
                <img src={logo} alt="Logo" />
            </div>
            {
             !nav ? 
            <div >    
                <Link className={s.li} to="/home">Inicio</Link>
                {/* <Link className={s.li} to="/acerca">Acerca de</Link> */}
            </div>:
            <div>
              <Link className={s.li} to="/activities">Crear Actividad</Link>
              <Link className={s.li} to="/acerca">Acerca de</Link>
            </div>
            }           
        </div>
    )
}