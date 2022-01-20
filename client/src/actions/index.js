import axios from 'axios';
import {
    GET_COUNTRIES,
    GET_DETAIL,
    GET_NAMECOUNTRY,
    ORD_BYPOPUL,
    ORD_BYNAME,
    ORD_CONTINENT,
    SHOW_ACTIV,
    ORD_BYACTIVITY
  } from "./actionNames";

export function getCountries(){
  return async function(dispatch){
      try{
        var json= await axios("http://localhost:3001/countries");
        console.log(json)
        return dispatch({
          type: GET_COUNTRIES,
          payload:json.data
      })
      }catch (error) {
        console.log(error)
      }
      
  }
}
export function getShowActivity(){
  return async function(dispatch){
      try{
        var json= await axios("http://localhost:3001/activities");
        console.log(json)
        return dispatch({
          type: SHOW_ACTIV,
          payload:json.data
      })
      }catch (error) {
        console.log(error)
      }
      
  }
}
export function getNameCountries(name){
  return async function (dispatch){
      try{
          var json_w = await axios.get("http://localhost:3001/countries?name=" + name);
          return dispatch ({
              type: GET_NAMECOUNTRY,
              payload: json_w.data
          })
      } catch (error) {
          alert("No hay coincidencia , busque nuevamente")
      }
  }

}
export function postCharacter(payload){
  return async function (dispatch) {
      const response = await axios.post("http://localhost:3001/activities",payload);
      console.log(response)
      return response.data;
  }
}
export function getDetail(id){
  return async function (dispatch){
      try{
          var json = await axios(`http://localhost:3001/countries/${id}`);
          console.log(json.data)
          return dispatch ({
              type: GET_DETAIL,
              payload: json.data
          }) 
      } catch (error){
          console.log(error)
      }
  }

}

export const orderCont = (payload) => {
  return {
    type: ORD_CONTINENT,
    payload,
  };
}
export const order_ByName = (payload) => {
  return {
    type: ORD_BYNAME,
    payload,
  };
}
export const order_ByPopul = (payload) => {
  return {
    type: ORD_BYPOPUL,
    payload,
  };
}
export const order_ByActivity = (payload) => {
  return {
    type: ORD_BYACTIVITY,
    payload,
  };
}


