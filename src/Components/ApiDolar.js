import { useState, useEffect } from 'react';
import axios from "axios";
const ApiDolar = () =>{
const [data, setData] = useState();
useEffect(() => {
  const getDolar = async () =>{
      axios({
        url: "https://api.bluelytics.com.ar/v2/latest",
      })
      //Una vez que obtengo su resultado
        .then((response) => {
          //El primer query busco en sus elementos y empeizo a darle forma a mi objeto
          setData(response.data.blue.value_sell)
            // Agrego los elementos a mi array vacio y multiplico el valor cargado en Firabase por lo que llega de la API
            
          })
        .catch((error) => {
          console.log(error);
        });   
  }
  getDolar();
},[]);
return data
}
export default ApiDolar;

