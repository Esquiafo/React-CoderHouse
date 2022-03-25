import {Link, useParams} from "react-router-dom"
import finalData from "../../Components/ProductsApi.js"
import React, { useContext, useState } from 'react';
import CartContext from "../../Context/CartContext"
import { Image, Segment, Icon, Divider, Header } from 'semantic-ui-react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import ApiDolar from '../../Components/ApiDolar'

const ItemDetail = () => {
  const dolarApi = ApiDolar()
  const ultimateData = finalData();
  const value = useParams();
  const [contador, setCounter] = useState(1);
  let count=-1
  const filterItem=[]
  
  const context = useContext(CartContext);
  const increase = (h)=>{
    setCounter(contador== h.target.value ? contador+0 : contador+1)
  }
  const decrease = ()=>{
    setCounter(contador==1 ? contador+0 : contador-1)
  }
  const onAdd = () =>{
    ultimateData.find(x=> x.id==value.productId ? ( context.addItems({img: x.img, id: x.id, cantidad: contador, price:x.price*dolarApi, title: x.title, stock: x.stock }) ) : (null))
  }

  let filterView
  if (finalData()!==undefined && dolarApi!==undefined) {
    //Si el producto tiene stock entonces dejo crear la lista
    filterItem.push(ultimateData.filter(x=>x.id==value.productId && x.stock > 0))
    if (filterItem[0][0]!==undefined) {
      if(filterItem[0][0].f1==undefined || filterItem[0][0].f2==undefined){
 
      }else{
        filterView = filterItem[0][0].f1.map(x=>{
          count++
          
          return(
            <div key={count}>
      
  
      <Segment clearing>
      <Header as='h3' floated='left'>
        <span>{x}</span>
        <Divider  vertical />
      </Header>
       
      <Header as='h3' floated='right' style={{backgroundColor: ""}}>
      <Divider  vertical />
       <span>{filterItem[0][0].f2[count]}</span>
      </Header>
    </Segment>        
            </div>
          )
        })
      }
    }

}

  return (
    <div style={{padding: '10px',background: '#EAEAEA'}}>
     
     {filterItem.length!==0 ? (
      filterItem[0][0] == undefined ? (
<div style={{heigth: '100%'}}>
        <h1>
          No disponible
        </h1>
            <Link to={'/'}>
            <Button> Volver</Button>  
            </Link>  
            
</div>
      ) : (
        
        <div key={filterItem[0][0].id}>
        <Container >
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <Col style={{heigth: '10', background: 'white'}} xs={12} md={4}>
            <Image src={`${filterItem[0][0].img[0]}`} size="medium" rounded  centered/>
            <h2>Precio unitario: ${dolarApi*filterItem[0][0].price}</h2>
            <h3>Cantidad:  <Button variant="outline-dark"  onClick={decrease}>-</Button>  {contador}   <Button variant="outline-dark" value={filterItem[0][0].stock} onClick={increase}>+</Button> <a style={{color: "grey"}}>(Disponibles: {filterItem[0][0].stock}) </a></h3>
      
            <Link to="/cart" >
            <Button style={{width: '100%', background: '#1C5D99',  border: 'none'}} variant="success" onClick={onAdd} >Agregar al carrito</Button>
            </Link>
        
            </Col>
            <Col  xs={12} md={8}>
            {filterView==undefined ? (
              //En el caso de que no hayan datos cargados no sale este title 
              <h2 style={{textAlign: "center"}}>Faltan datos para completar la vista</h2 >

            ) : (<div >
              
              <Divider style={{background: "white", padding: "10px 0 10px 0"}} horizontal>
               <Header  as='h2'>
                <Icon name='bar chart' />
                Especificaciones
               </Header>
              </Divider>
              {filterView}
              </div>
              )}    
            </Col>
          </Row>
        </Container>
          

      </div>
      )
       
      ) : (
        
        <div className="d-flex col-md-12  justify-content-center">
          <br></br>
        <div style={{width: "100px",  height: "100px"}}  className="spinner-border" role="status">
          <span  className="visually-hidden">Loading...</span>
        </div>
      </div>
     )}
    </div>
  )

  

};

export default ItemDetail;