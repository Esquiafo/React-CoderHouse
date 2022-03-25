import React, {useContext, useState} from 'react';
import CartContext from '../../Context/CartContext';
import finalData from "../../Components/ProductsApi"
import apiData from "../../Components/PushApi"
import userData from "../../Components/UserApi"
import ApiContext from '../../Context/ApiContext';
import { Link} from 'react-router-dom';
import { Input, Image, Form, Step, Icon, Label, Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import { Container, Row, Col, Button } from 'react-bootstrap';


import "./Cart.css"
import AOS from 'aos';
AOS.init({
  once: true,
  easing: 'ease-in-out'
});

const Cart = () =>{


  const context = useContext(CartContext); //CONTEXT PARA PRODUCTOS
  const contextApi = useContext(ApiContext); //CONTEXT PARA API
  const lastValue=finalData(); //API PRODUCTOS
  const userValue= userData(); //API USER DEV
  const increase = (h)=>{
    context.upCant(h.target.value)
  }
  const decrease = (h)=>{
    context.downCant(h.target.value)
  }
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [validemail, setValidemail] = useState('')
  let [phone, setPhone] = useState('')
  let count = -1
  let id
  let cantidad
  let var1 = true
// Validadores de la API
  let validEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
  let validName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(name)
  let validPhone = /\b(?:\d[ ]*?){6,}\b/.test(phone)
  let validEmailEmail = email == validemail
  const costoEnvio = 1000
  const deleteId = (h)=>{
    context.eliminarId(h.target.value);
}
  const fullClear = ()=>{
    context.clear()
}

const exitCart = ()=>{
  setShow(true)
  contextApi.items=context.items;
  contextApi.name=name;
  contextApi.email=email;
  contextApi.phone=phone;
  apiData(contextApi)
  context.clear()
 
}
const mercadoLibre = ()=>{
  
}
let finalPrice = 0
context.items.map(x=> finalPrice= finalPrice + (x.cantidad*x.price))
  const products = context.items.map(product => {
    count++
    id = product.id
    cantidad = product.cantidad
    return (
    <div key={product.id}>
      {lastValue!==undefined? (
      <Segment style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>

   <Container>
     <Row style={{justifyContent: "center"}}>
   <Link style={{textAlign: 'end'}} to="/cart">
          
          <Label style={{background: "#AC1C3C", color: 'white',  border: 'none'}}  circular onClick={deleteId} value={count}  key={'red'}>X</Label>
          </Link>
      <Col xs={6} sm={6} md={4} lg={3} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center' }}><Image size='medium' src={`${product.img[0]}`} rounded /></Col>

      <Col xs={6} sm={6} md={4} lg={3} className="text-break" style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}><h2>{product.title}</h2></Col>

      <Col  md={4} sm={6}lg={3} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}>
 
        <Link style={{display:'flex'}} to="/cart">

          <Button variant="outline-dark" style={{width: '35px'}} value={count} onClick={decrease}>-</Button>
          <Input   style={{width: '65px', textAlign: 'center'}} value={product.cantidad}/>    
          <Button variant="outline-dark" style={{width: '35px'}} value={count} onClick={increase}>+</Button>
       
        </Link> 
 
        
      </Col>

      <Col sm={6} md={8} lg={3} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}><h2><Label tag size={'big'} as='a'>${(product.price)*(product.cantidad)}</Label></h2></Col>
      <Col sm={6}  md={4} lg={3}  style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}>


      </Col>
    



      </Row></Container>
      </Segment>
    


    )  : (
      <div>
   <h1>Cargando</h1>
    </div>
    )}
      
  </div>
  );

})
// Handler de elementos del formulario
const handleName = (event) => {
  setName(event.target.value)
}
const handleEmail = (event) => {
    setEmail(event.target.value)
}
const handleValidEmail = (event) => {
  setValidemail(event.target.value)
}
const handlePhone = (event) => {
  setPhone(event.target.value)
}
const [show, setShow] = useState(false);

const form = () =>{
  return(

  <div style={{
    background: 'white',
    borderRadius: '10px',
    paddingBottom: '10px',
    padding: '10px 10px 10px 10px',
    marginBottom: '10px'
    
        }} className="ui form">

    <div className=" field col-xs-12">
      {/* Validaciones y formulario para la API */}
      {validName==true ? (
      <Form.Field
      required
      id='form-input-control-error-name'
      control={Input}
      label='Nombre completo'
      placeholder='Cosme Fulanito'
      onChange={handleName}/>
   
      ) : (
        <Form.Field
        required
        id='form-input-control-error-name'
        control={Input}
        label='Nombre completo'
        placeholder='Cosme Fulanito'
        error={{
          content: 'Ingresa tu nombre valido',
          pointing: 'below',
        }}
        onChange={handleName}/>
      )}

    </div>
    <div className="field  col-xs-12">
      {validEmail==true ? (
      <div>
      <Form.Field
      required
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='cosme@fulanito.com'
      onChange={handleEmail}/>

        {email!==validemail ? (
      <Form.Field
      required
      id='form-input-control-error-email'
      control={Input}
      label='Re-Email'
      placeholder='cosme@fulanito.com'
      error={{
        content: 'Los correos no coinciden',
        pointing: 'below',
      }}
      onChange={handleValidEmail}/>
        ) : (
      <Form.Field
      required
      id='form-input-control-error-email'
      control={Input}
      label='Re-Email'
      placeholder='cosme@fulanito.com'
      onChange={handleValidEmail}/>
        )}
      </div>
      ) : (
      <div>
      <Form.Field
        required
        id='form-input-control-error-email'
        control={Input}
        label='Correo electronico'
        placeholder='cosme@fulanito.com'
        error={{
          content: 'Ingresa un correo valido',
          pointing: 'below',
        }}
        onChange={handleEmail}/>
      </div>
      )}
    </div>

    <div className="field  col-xs-12">
    {validPhone==true ? (
      <Form.Field
      required
      id='form-input-control-error-phone'
      control={Input}
      label='Telefono'
      placeholder='Cosme Fulanito'
      onChange={handlePhone}/>
   
      ) : (
        <Form.Field
        required
        id='form-input-control-error-phone'
        control={Input}
        label='Telefono'
        placeholder='11223344'
        error={{
          content: 'Ingresa un telefono valido',
          pointing: 'below',
        }}
        onChange={handlePhone}/>
      )}
                 {/* Si la paso todas las validaciones muestro el botom comprar */}
                 { (!validEmailEmail || !validName || !validPhone || !validEmail ) ? (null) : (
        <div>
       
                <Link to={'/cart'}>
                  
          <Button style={{width: '100%', background: '#1C5D99',  border: 'none'}} onClick={exitCart}>Transferencia  </Button>
                </Link>
        
       
       
        <Button style={{width: '100%', background: 'grey', marginTop:'10px', border: 'none'}} onClick={mercadoLibre}>MercadoLibre</Button>
        </div>
     )}
    </div>



  </div>
       
  
  )
}

  return (
   
    <div style={{background: '#EAEAEA'}}>
    

    {products.length!==0 ? (
    <Container>
      <Row style={{padding: '10px 0px 10px 0px'}}>
      <Col style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}} sm={8}>
      <Header as='h2'>
        <Icon name='cart' />
        <Header.Content>Carrito de compras</Header.Content>
      </Header>
      </Col >
      <Col style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}> 
        <Link  to="/cart">
           <Button style={{background: '#AC1C3C', border: 'none'}}  onClick={fullClear} >Vaciar</Button>
        </Link>
      </Col>
     </Row>
      <Row>
      
      <Col xs={12} md={8}>
        {products}
      </Col>
      <Col md={4}>
      {form()}
      <Col md={12}>
            <Col> 
            
            <Container style={{padding: '10px'}}>
            <Row xs={2} md={2}>
            <Step.Group widths={2} style={{background: "white"}}>
            <Step >

            <Step.Content>
            <Step.Title>Productos</Step.Title>
            </Step.Content>
            </Step>
            <Step >
            <Step.Content>
            <Step.Title>${finalPrice}</Step.Title>
            </Step.Content>
            </Step>
            </Step.Group>
            </Row>

            <Row xs={2} md={2}>
            <Step.Group widths={2} style={{background: "white"}}>
            <Step >
            <Step.Content>
            <Step.Title>Envio</Step.Title>
            </Step.Content>
            </Step>
            <Step >
            <Step.Content>
            <Step.Title>{finalPrice>10000 ? ("$0") : ('$1000')}</Step.Title>
            </Step.Content>
            </Step>
            </Step.Group>
            </Row>
            
            <Row xs={2} md={2}>
            <Step.Group widths={2} style={{background: "white"}}>
            <Step >
            <Step.Content>
            <Step.Title>Precio final</Step.Title>
            </Step.Content>
            </Step>
            <Step >
            <Step.Content>
            <Step.Title>${finalPrice>10000 ? (`${finalPrice}`) : (`${finalPrice+1000}`)}</Step.Title>
            </Step.Content>
            </Step>
            </Step.Group>
            </Row>
            </Container>

            </Col>
            <Col>
 
            </Col>
      </Col>
    
      </Col>
      </Row>
      </Container>
    ) : (
    <div>
    {show==true ? (
     
        <Segment inverted
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical>
      <Dimmer active>
        <Loader>Redirigiendo aguarde unos segundos...</Loader>
      </Dimmer>

    </Segment>

    ) : (
      
      <Image  src="https://firebasestorage.googleapis.com/v0/b/artstation-c28e8.appspot.com/o/EmptyCart-icon.png?alt=media&token=d43cdead-fed5-434e-8d9d-616d04fde055" size="big" rounded  centered/>
   
    )}
    </div>
    )}
   </div>
  );
};
export default Cart;