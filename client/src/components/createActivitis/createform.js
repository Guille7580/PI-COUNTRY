import React from "react";
import { useState,useEffect } from "react";
import { useSelector , useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import {postCharacter} from '../../actions/index'
import { getCountries } from "../../actions";
import Nav from '../Nav/Nav'

function validate (activity) {

    let nameTest =/^[a-zA-ZA-y\s]{3,80}$/; //solo letras de 3 a 80 caracteres
    let errors = {} ;
    if (!activity.name) {
        errors.name = 'Se requiere un nombre de Actividad'} 
    else if (!nameTest.test(activity.name.trim())) {
            errors.name = 'No se permiten numeros , solo letras de 3 a 80 caracteres'}     
    else if (!activity.difficulty) {
        errors.difficulty = 'Se requiere un nivel de Dificultad '}
    else if (!activity.duration) {
        errors.duration = 'Se requiere el tiempo de la Actividad'} 
    else if (!activity.season) {
        errors.season = 'Se requiere una Temporada'} 
    else if  (activity.countryID.length < 1 ) {
        errors.countryID = 'Se requiere una Pais'}
    return errors
       
}    

export default function Createform () {
    
    const dispatch = useDispatch()
    const history = useNavigate()
    const CountriesAll = useSelector ((state)=>state.countries)
    console.log(CountriesAll)

    useEffect (() =>{
        dispatch(getCountries());
      },[dispatch])
   
    const [errors , setErrors] = useState ({})
    const [activity,setactivity] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countryID:[]
    })

    //console.log(activity)

    const handleChange =(e) => {
        setactivity({
            ...activity,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...activity,
            [e.target.name] : e.target.value
        }));
        
    }
    

    const handleSelect = (e) => {
       
        setactivity({
            ...activity,
            countryID : [...activity.countryID , e.target.value]
        })
        setErrors(validate({
            ...activity,
            countryID : e.target.value
        }));
        console.log(activity)
    } 

    const handleSubmit = (e)=>{
               
        e.preventDefault();
       
        if (!activity.name || !activity.difficulty || !activity.duration || !activity.season || (activity.countryID.length < 1 )){
            alert (" rellene los campos faltantes")
        } else {
        console.log(activity)
        dispatch(postCharacter(activity))
        alert("Actividad fue creada correctamente")
        setactivity({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countryID:[]
        })
        history('/home')}

    }

    function handleDelete(el){
        setactivity({
            ...activity,
            countryID : activity.countryID.filter(occ => occ !== el) 
        })
    }

    const handleReset =(e) => {
        e.preventDefault()
        setactivity({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countryID:[]
        })
      }
        
    return (
        
        <div> 
            <Nav />
            {/* <Link to='/home'>
                <button>Volver</button>
            </Link> */}
            <h1>Crear Actividad</h1>
            <form onSubmit={handleSubmit}>
              <div> 
                <div>
                   <label>Nombre de Actividad : </label>
                   <input type='text' 
                          name="name" 
                          value={activity.name} 
                          onChange={handleChange} 
                          id="name"/>
                   {errors.name && (
                       <p className = 'error'>{errors.name}</p>
                   )}
                </div>
                <div>
                   <label>Dificultad : </label>
                   <select name = 'difficulty' onChange={handleChange} >
                      <option value=''>Selecciona la dificultad</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                   </select>
                   {errors.difficulty && (
                       <p className = 'error'>{errors.difficulty}</p>
                   )}
                </div>
                   
                <div >
                    <label>Duracion : </label>
                    <select name='duration' onChange={handleChange}>
                      <option value=''>Tiempo en horas</option>  
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                      <option value={20}>20</option>
                      <option value={21}>21</option>
                      <option value={22}>22</option>
                      <option value={23}>23</option>
                      <option value={24}>24</option>
                    </select>
                    <label> hs </label>
                    {errors.duration && (
                       <p className = 'error'>{errors.duration}</p>
                   )}
                </div>
                <div >
                    <label>Temporada : </label>
                    <select name="season"  onChange={handleChange} >
                      <option value=''>Selecciona la Estacion</option>  
                      <option value="Verano">Verano</option>
                      <option value="Invierno">Invierno</option>
                      <option value="Otoño">Otoño</option>
                      <option value="Primavera">Primavera</option>
                    </select>
                    {errors.season && (
                       <p className = 'error'>{errors.season}</p>
                   )}
                </div>
                <div>
                    <label>Paises : </label>
                    <select  onChange={handleSelect} >
                        {/* <option  value="" >Selecciona un pais</option> */}
                        {CountriesAll?.map (el =>
                            <option key={el.id} value={el.name} >{ el.name}</option>
                        )}
            
                    </select>
                    {errors.countryID && (
                       <p className = 'error'>{errors.countryID}</p>
                   )}
                </div>
                {/* <ul><li>{activity.countryID.map(el=> el + ",")}</li></ul> */}
                <div>
                    <button
                    // className={a.boton}
                    type="reset"
                    onClick={(e) => handleReset(e)}
                    >
                    Reset Form
                    </button>
                    {/* <button type="submit">Crear Actividad</button> */}
                    {
                    errors.hasOwnProperty('name') ||
                        errors.hasOwnProperty('difficulty') ||
                        errors.hasOwnProperty('duration') ||
                        errors.hasOwnProperty('season') ||
                        errors.hasOwnProperty('pais') ?
                        <p> Por favor complete los campos faltantes </p> :
                        <button type='submit' className='boton'> Crear Actividad </button>}
                </div>
              </div>  
            </form>
            {
            activity.countryID.map(el => 
                <div  >
                    <h3>{el}</h3>
                    <button  onClick={() => handleDelete(el)}>x</button>
                </div>
            )}
           
        </div>

    )
}