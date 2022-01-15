import React from "react";
import { useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { getDetail} from '../../actions/index'
import { useEffect } from "react";
import Nav from '../Nav/Nav'

export default function Detalles (props) {
    console.log(props)
    const {id} = useParams();
    const dispatch = useDispatch()
    
    const myCountry = useSelector ((state) => state.countryDetail)
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    
    console.log(myCountry)

    return(
        <div>
            <Nav/>
            {/* <Link to = '/home'>
                <button>Volver</button>
            </Link> */}
            {
               myCountry   ?
               <div>
                   <h1>Pais: {myCountry.name}</h1>
                   <img src={myCountry.flagimg} alt="img not found" width="300px" height="250px" />
                   <h3>ID Pais: {myCountry.id}</h3>
                   <h3>Continente: {myCountry.region}</h3>
                   <h3>Capital: {myCountry.capital}</h3>
                   <h3>Subregion: {myCountry.subregion}</h3>
                   <h3>Area: {myCountry.area} km²</h3>
                   <h3>Poblacion: {myCountry.population} Habitantes</h3> 
                   <div>
                       <h2>Actividades</h2>
                       <h3>{myCountry.activities?.map (el => <div> Id  {el.id}   {el.name}  Dificultad: {el.difficulty}  Duracion: {el.duration} hs Temporada: {el.season}</div>)}</h3>
                   </div>
                   {/* {currentCountries?.map( el => 
                        <div key={el.id}>
                                <Card id={el.id} name={el.name} flagimg={el.flagimg ? el.flagimg : el.flagimg } region={el.region} />
                        </div>
                )} */}
                   
               </div> : <p>Loading..</p>
            }
            

        </div>
    )


}