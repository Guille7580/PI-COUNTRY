import React from 'react';
import styles from '../paginado/Paginado.module.css'

export default function Paginado ({countriesPerPage,allCountries,paginado}){
    const pageNumbers = []
    //para saber la cantidad de paginas es ((paisesActuales-9)/10)+1 eso va dentro del Math.ceil
    //el -9 es por los 9 paises de la página 1, el /10 es por la cantidad de países por página a partir
    //la cuenta esa nos va a dar la cantidad de páginas a partir de la segunda inclusive. Y luego le sumo 1
    //por la primer página.
    
    for (let i = 1; i <= Math.ceil((allCountries - 9)/(countriesPerPage + 1)) + 1  ; i++) {
        pageNumbers.push(i )    
    }
     //console.log(pageNumbers)
     //console.log(characterPerPage)
    return(
        <nav>
            <ul className={styles.crumbs} >
                {
                pageNumbers?.map(number => (
                    <li className={styles.crumbss} key={number} >
                        <div  onClick={() => paginado(number)}>{number}</div>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}