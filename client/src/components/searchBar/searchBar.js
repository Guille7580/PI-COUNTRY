import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../actions";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    function handleInputChange (e) {
        
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
       
    }

    function handleSubmit (e) {
        e.preventDefault()
        dispatch(getNameCountries(name))
        setName('')
        
    }
    
    return(
        <div>
           <input
              type='text'
              placeholder="Buscar..."
              onChange={(e) => handleInputChange(e)}
              value= {name}
              placeholder="Nombre del país"
           />
           <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>

        </div>
    )
}