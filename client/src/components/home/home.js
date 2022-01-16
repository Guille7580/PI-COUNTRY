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
    const nav=true

    const dispatch = useDispatch();
    const allCountries = useSelector ((state)=>state.countries)
    const allActivities = useSelector((state)=>state.countryActivity)
    const [orden,setOrden] = useState('')
    const [ordenx,setOrdenx] = useState('')
    const [currentPage,setCurrentPage] =  useState(1)//Pagina actual
    const [countriesPerPage,setcountriesPerPage ]  = useState(10)//paises por pagina
    const indexOfLastCountryPage = currentPage * countriesPerPage //10
                                    //1             10
    const indexOfFirstCountryPage =  indexOfLastCountryPage - countriesPerPage //0       
                                       //10                         10
    const currentCountries = allCountries.slice(indexOfFirstCountryPage,indexOfLastCountryPage)

    //console.log("pagina" , currentPage)
    //console.log("array" , currentCountries)

    // if (setCurrentPage === 1) {
    //     setcountriesPerPage(9)
    // }else{
    //     setcountriesPerPage(10)
    // }
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
                <label> Poblacion: </label>
                <select onChange={handleorderPopulation}>
                    <option value='nada'>Ordenar</option> 
                    <option value='asce'>Menor a Mayor</option>
                    <option value='desce'>Mayor a Menor</option>
                </select>
                <label> Nombre: </label>
                <select onChange={handleorderByName}>
                     <option value='nada'>Eliga un Orden</option> 
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <label>  Actividades: </label>
                <select  onChange={handleFilterActivite} >
                    <option value='All'>Actividad</option>
                        
                    {allActivities?.map (el =>
                        <option key={el.id} value={el.name} >{ el.name}</option>
                    )}
            
                </select>
                    {/* {errors.countryID && (
                       <p className = 'error'>{errors.countryID}</p>
                   )} */}
                
                      
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