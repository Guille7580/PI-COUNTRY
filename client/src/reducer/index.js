import {
    GET_COUNTRIES,
    GET_DETAIL,
    GET_NAMECOUNTRY,
    ORD_BYPOPUL,
    ORD_BYNAME,
    ORD_CONTINENT,
    SHOW_ACTIV,
    ORD_BYACTIVITY
  } from "../actions/actionNames";

  
const initialState = {
    countries: [],
    allcountries:[],
    countryDetail: {},
    countryActivity:[]
};


function rootReducer  (state = initialState, action) {
    switch (action.type) {
      case GET_COUNTRIES: 
        return {
          ...state,
          countries: action.payload,
          allcountries: action.payload
        }
      case SHOW_ACTIV :
        return {
          ...state,
          countryActivity: action.payload,
        }  
      case ORD_CONTINENT:
        const allCountrie = state.allcountries
        const statusFilterCont = action.payload === 'All' ? allCountrie : allCountrie?.filter(el => el.region === action.payload)
        return{
          ...state,
          countries : statusFilterCont
        }
      case ORD_BYACTIVITY:
       // const filterActivi = state.countries.filter((c)=>{ return c.activities.some((a)=> a.name === action.payload)})
        const allCoun = state.allcountries ;
        const filterActivi = action.payload === 'All' ? allCoun : 
        allCoun.filter( c => c.activities && c.activities.filter((a) => a.name === action.payload).length)
        return{
          ...state,
          countries : filterActivi
        }
      case ORD_BYNAME:
        var sorted 
            if(action.payload === 'nada'){
                sorted = state.countries
            }
            if (action.payload === 'asc'){
                sorted = state.countries.sort((a,b) => {
                    if (a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                })
            }
            if(action.payload === 'desc'){
                sorted = state.countries.sort((a,b) => {
                    if (a.name > b.name) return -1;
                    if(a.name < b.name)return 1;
                    return 0;
                })
            }
              return{
            ...state,
            countries:  sorted
            } 
      case GET_NAMECOUNTRY :
        return{
          ...state,
          countries:action.payload
        }   
      case GET_DETAIL:
        return{
          ...state,
          countryDetail:action.payload
        }  
      case ORD_BYPOPUL:
        var sortedad 
            if(action.payload === 'nada'){
                sortedad = state.countries
            }
            if (action.payload === 'asce'){
                sortedad = state.countries.sort((a,b) => {
                    if (a.population > b.population) return 1;
                    if(a.population < b.population) return -1;
                    return 0;
                })
            }
            if(action.payload === 'desce'){
                sortedad  = state.countries.sort((a,b) => {
                    if (a.population > b.population) return -1;
                    if(a.population < b.population)return 1;
                    return 0;
                })
            }
              return{
            ...state,
            countries:  sortedad
            } 
         
      default:
        return state;
    }
     


}

export default rootReducer;