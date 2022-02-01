import React  from 'react';
import {useState , useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {getCountries, orderCont ,order_ByName,order_ByPopul,getShowActivity,order_ByActivity } from '../../actions/index';
//import { Link } from 'react-router-dom';
//import style from '../home/home.module.css';
import Cards from '../cards/cards';
import Paginado from '../paginado/paginado';
import SearchBar from '../searchBar/searchBar';
import Nav from '../Nav/Nav'

export default function Home () {
    //const countriesPerPage=9
    let indFirstCountry  = 0 //Para restar al primer indice de los paises despues de la pag 1
    let indLastCountry  = 0 //Para restar al ultimo indice de los paises despues de la pag 1
    const nav=true

    const dispatch = useDispatch();
    const allCountries = useSelector ((state)=>state.countries)
    const allActivities = useSelector((state)=>state.countryActivity)
    const [orden,setOrden] = useState('')
    const [ordenx,setOrdenx] = useState('')
    const [currentPage,setCurrentPage] =  useState(1)//Pagina actual
    const [countriesPerPage ]  = useState(9)//paises por pagina

    //Este if es para mostrar 9 en la primer página, si no es la primera va a valer 0, entonces va a mostrar 10
    //Este if es para restar y sumar en los indices para el slice para ir manteniendo las paginas y que en la
    //primera muestre 9 y de ahi en adelante muestre 10.
    /*
    Paginas               1     2      3      4     5
    indexOfFirstCountry   0     9      1     27    36
    indexOfLastCountry    9     17     27     36    45
    Como el slice saca uno menos del segundo argumento por eso el final de uno es el inicio del otro
    La tabla para obtener 9 en el primero y 10 a partir de la segunda deberia ser
    Paginas               1     2      3      4     5
    indexOfFirstCountry   0     9      18     27    36
    indexOfLastCountry    8     17     26     35    44
    Como a partir de la segunda pagina tienen que ser 10 países por página, los indices deberian ser
    Paginas               1     2      3      4     5
    indexOfFirstCountry   0     9      19     29    39
    indexOfLastCountry    8     18     28     38    48
    Si se saca la diferencia entre las do ultimas tablas
    Paginas                  1     2      3      4     5
    difindexOfFirstCountry   0     0      1      2     3
    difindexOfLastCountry    0     1      2      3     4
    Sacando la serie a partir de la pagina 2 al indexOfFirstCountry hay que sumarle el numero de la pagina actual - 2 
    (indFirstCountry =currentPage - 2;)
    Sacando la serie a partir de la pagina 2 al difindexOfLastCountry hay que sumarle el numero de la pagina actual - 1 
    (indLastCountry = currentPage - 1;)
    */

    if (currentPage === 1) {
        indFirstCountry  = 0;
        indLastCountry = 0;
      } else {
        indFirstCountry = currentPage - 2;
        indLastCountry = currentPage - 1;
      }
      //console.log("first" ,indFirstCountry)
     // console.log('last' ,indLastCountry)

    const indexOfLastCountryPage = currentPage * countriesPerPage //9
                                    //1             9
    const indexOfFirstCountryPage =  indexOfLastCountryPage - countriesPerPage //0       
                                       //9                         9
    //const currentCountries = allCountries.slice(indexOfFirstCountryPage,indexOfLastCountryPage)
    const currentCountries = allCountries.slice(indexOfFirstCountryPage + indFirstCountry,
                                                indexOfLastCountryPage + indLastCountry)

    //console.log("pagina" , currentPage)
    //console.log("array" , currentCountries)

  
    useEffect (() =>{
        dispatch(getCountries());
      },[dispatch])
      
    useEffect (() =>{
        dispatch(getShowActivity());
      },[dispatch])
    

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    
    function handleClick (e) {
        e.preventDefault()
        dispatch(getCountries())
    }

    const handleFilterCont = (e) => {
        e.preventDefault()
        dispatch(orderCont(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterActivite = (e) => {
        e.preventDefault()
        dispatch(order_ByActivity(e.target.value))
        setCurrentPage(1)
    }

    const handleorderPopulation = (e) =>{
        e.preventDefault();
        dispatch(order_ByPopul(e.target.value))
        setCurrentPage(1)
        setOrdenx(`Ordenadox ${e.target.value}`)
    }
    
    const handleorderByName = (e) =>{
        e.preventDefault();
        dispatch(order_ByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Nav nav={nav}/>
            <h3>Paises del Mundo</h3>
            {/* <Link to='/activities'><button>Crear Actividades</button></Link> */}
            <SearchBar/>
            <button onClick={e=>{handleClick(e)}}>Recargar Paises</button>
            <div>
                
                <label> Continente: </label>
                <select onChange={handleFilterCont} >
                    <option value='All'>Todos</option>
                    <option value='Americas'>America</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>Africa</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Antarctic'>Antartida</option>
                </select>
                <label> Actividades Turisticas: </label>
                <select  onChange={handleFilterActivite} >
                    <option value='All'>Actividad</option>
                        
                    {allActivities?.map (el =>
                        <option key={el.id} value={el.name} >{ el.name}</option>
                    )}
            
                </select>
                <label> Poblacion: </label>
                <select onChange={handleorderPopulation}>
                    <option value='nada'>Ordenar</option> 
                    <option value='asce'>Menor a Mayor</option>
                    <option value='desce'>Mayor a Menor</option>
                </select>
                <label> Nombre Pais: </label>
                <select onChange={handleorderByName}>
                     <option value='nada'>Eliga un Orden</option> 
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                
                <Paginado
                   countriesPerPage={countriesPerPage}
                   allCountries={allCountries.length}
                   paginado={paginado}
                />
                
                <Cards 
                   currentCountries={currentCountries}
                />
              
            </div>
            
         </div>
    )
}