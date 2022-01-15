import React from "react";
import style from '../card/card.module.css'

export default function Card ({id,name,region,flagimg}) {
    return (
        <div className={style.card}>
            
            <h3>{name}</h3>
            <img src={flagimg} alt="img not found" width="150px" height="100px" />
            <h4>{id}</h4>
            <h4>{region}</h4>
            
        </div>
    )
}