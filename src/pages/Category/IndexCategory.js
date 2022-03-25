import data from "../../Components/ProductsApi"
import { Link } from "react-router-dom";
import { Container, Row, Col  } from 'react-bootstrap';
import {Image } from "semantic-ui-react";

const IndexCategory = () => {
  const test = data()
  const newCatMarca = []
  let arr
  let showCategory;
  if (data()!==undefined) {
    //Mapeo y guardo solamente las 3 variables que me interesan 
    test.map(a => newCatMarca.push({category: a.category, img: a.img[1]}));
    //Maepo las de la forma que necesitaba y empieza el filtrado de repetidos
    newCatMarca.map(x=>{
          //Si el array no existe lo creo por primera vez
           if (arr==undefined) {
               arr=[]
               var obj = {};
               obj[x.category] = [x.img];
               arr.push(obj);
           }else{
             //Busco en todos los elementos del array nuevo si existe en algunos de sus elementos la categoria
               arr.map(b=>{
                 //Si ya existia la categoria le agrego la marca
                   if (b[x.category]!==undefined) {
                       b[x.category].push(x.img)
                //Si la marca se repite se remueve 
                       b[x.category]=[...new Set(b[x.category])]
                   }else{
                //Si la categoria no exisita la agrego
                       b[x.category]= [x.img];
                   }
               })
           }
      })
    //Mapeo las categorias filtradas y que sus marcas no se repiten
    showCategory = arr.map(b=>{
      return(
        <div style={{background: 'white'}} key={b} >   
      {/* Mapeo el arr  */}   
        {arr.map((items, index) => {
  return (
  
 <div key={index}>
    <Container>
    <Row xs={3} md={6} style={{display: 'flex', justifyContent: 'center'}}>  
       {/* Imprimo el objecto por categoria INDEX y que se encuentra dentro de ITEMS  */}
    {Object.keys(items).map((index) => {
      return (      
        <div style={{margin: '20px 20px 20px 20px', textAlign: 'center'}} key={index}>          
           <Col>
          {/* Si la categoria es distinta de undefined imprimo la categoria */}
         { index!==undefined ? (    
           <h2><Link to={`/category/${index}`}>{index}</Link></h2>      
          ) : (
            null
          )}  
          {/* Mapeo el array por sus elemtentos de adentro */}
           {items[index].map(x=>{
             return(
               <div key={x}>
                 <Link to={`/category/${index}`}>
                   <Image  src={`${x}`} size="tiny" rounded  centered/>
                 </Link>
               </div>
             )
           })}

    </Col>
          </div>
      )
    })}
    </Row>
    </Container>
    </div>
  
  )
})}
      </div>
      )
    })
  }
  return (
    <div>
      {test!==undefined ? (

      <div>
        <h1 style={{textAlign: 'center'}}>Categorias </h1>
          {showCategory} 
      </div>

      ) : (
     
     null
     
      )}
    </div>
  );
};

export default IndexCategory;
