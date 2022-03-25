import data from "../../Components/ProductsApi"
import { Link } from "react-router-dom";
import {  Menu  } from "semantic-ui-react";

const Category = () => {
  const test = data()
  const newCatMarca = []
  let arr
  let showCategory;
  if (data()!==undefined) {
    //Mapeo y guardo solamente las 3 variables que me interesan 
    test.map(a => newCatMarca.push({category: a.category, marca: a.marca}));
              //Maepo las de la forma que necesitaba y empieza el filtrado de repetidos
    newCatMarca.map(x=>{
              //Si el array no existe lo creo por primera vez
           if (arr==undefined) {
               arr=[]
               var obj = {};
               obj[x.category] = [x.marca];
               arr.push(obj);
           }else{
                //Busco en todos los elementos del array nuevo si existe en algunos de sus elementos la categoria
               arr.map(b=>{
                //Si ya existia la categoria le agrego la marca
                   if (b[x.category]!==undefined) {
                       b[x.category].push(x.marca)
                //Si la marca se repite se remueve 
                       b[x.category]=[...new Set(b[x.category])]
                   }else{
                 //Si la categoria no exisita la agrego
                       b[x.category]= [x.marca];
                   }
               })
           }
      })
      //Mapeo las categorias que no se repiten y sus marcas
    showCategory = arr.map(b=>{
      return(
        <div key={b} style={{justifyContent: "center", paddingTop: "10px"}} >
          <Menu style={{width: '100%'}} vertical>
        
      {/* Mapeo el arr  */}
        {arr.map((items, index) => {
  return (
 <div key={index}>
    {/* Imprimo el objecto por categoria INDEX y que se encuentra dentro de ITEMS  */}
    {Object.keys(items).map((index) => {
      return (
        <div key={index}>
            <Menu.Item>
          {/* Si el index es distinto de undefined imprimo la categoria con su index  */}
         { index!==undefined ? (    
            <Menu.Header><Link style={{width: '95%'}} to={`/category/${index}`}>{index}</Link></Menu.Header>          
          ) : (
            null
          )}
         <Menu.Menu>
            {/* Mapeo el array e imprimo sus elementos */}
           {items[index].map(x=>{
            
             return(
               <div key={items+x}>  
                 <Menu.Item
              name={`X${x}`}
              />
               </div>
             )
           })}
           </Menu.Menu>
          </Menu.Item>
          </div>
      )
    })}
    </div>
  
  )
})}
      </Menu>
      </div>
      )
    })
  }
  return (
    <div>
      {test!==undefined ? (




<div>{showCategory}</div>






      ) : (
     
        null
     
      )}
    </div>
  );
};

export default Category;