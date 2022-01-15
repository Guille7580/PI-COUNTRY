import React from 'react';
import styles from '../paginado/Paginado.module.css'

export default function Paginado ({countriesPerPage,allCountries,paginado}){
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage)  ; i++) {
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