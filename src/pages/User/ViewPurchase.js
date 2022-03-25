import {Link, useParams} from "react-router-dom"
import OrderApi from "../../Components/OrderApi";
import { Input, Image, Form, Step, Icon, Label, Segment, Header } from 'semantic-ui-react';
import { Container, Row, Col, Button } from 'react-bootstrap';


const ViewPurchase = () =>{
    const value = useParams();
    const order = OrderApi();
    let container = []
    let showContainer
    if (order !==undefined) {
        container = order.filter(x=>x.id == value.purchaseId)
        if (container[0]!==undefined) {
          showContainer = container[0].items.map(x=> {
            return(
                <div key={x.id}>
                   <Segment style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>

<Container>
  <Row style={{justifyContent: "center"}}>
   <Col xs={6} sm={6} md={4} lg={3} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center' }}><Image size='medium' src={`${x.img[0]}`} rounded /></Col>

   <Col xs={6} sm={6} md={4} lg={3} className="text-break" style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}><h2>{x.title}</h2></Col>


   <Col sm={6} md={6} lg={4} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}><h2><Label tag size={'big'} as='a'>${(x.price)}</Label></h2></Col>
   <Col sm={6} md={6} lg={4} style={{display: 'flex',paddingTop: '10px', justifyContent: 'center', marginTop: 'auto',   marginBottom: 'auto'}}><h3>Cantidad: {x.cantidad}</h3></Col>

 



   </Row>
   </Container>
   </Segment>
 
                </div>
            )
        })
        }else{
        
            return(
              <div>
                <h1>No existe dicha compra con ese usuario</h1>
              </div>
            )
          
        }
       
    }
   
return(
    <div>
        {order !==undefined  ? (
           <div style={{paddingTop: '10px'}}>
               <Container>
                   <Row>
                       <Col xs={12} md={6}>
                       <Segment.Group>
    <Segment>Datos importantes</Segment>
    <Segment.Group>
      <Segment  color='red'>
      <Step >
      <Icon name='truck' />
      <Step.Content>
        <Step.Title>Datos de envio</Step.Title>
        <Step.Description>Cargue sus datos de envio</Step.Description>
      </Step.Content>
    </Step>

      </Segment>
      <Segment  color='red'>
      <Step >
      <Icon name='credit card' />
      <Step.Content>
        <Step.Title>Cobro</Step.Title>
        <Step.Description>Cargue sus datos para acreditar el pago</Step.Description>
      </Step.Content>
    </Step>

      </Segment>
      <Segment  color='red'>
      <Step >
      <Icon name='bullhorn' />
      <Step.Content>
        <Step.Title>Estado</Step.Title>
        <Step.Description>Aqui figura el estado de su pedido</Step.Description>
      </Step.Content>
    </Step>
      </Segment>
    </Segment.Group>
    <Segment>Email: {value.userId} </Segment>
    <Segment>Numero de compra: {value.purchaseId}</Segment>
    <Segment inverted color="black">Cualquier consulta no dude en consultar al +11111111</Segment>
  </Segment.Group>
    
                       </Col>
                       <Col xs={12} md={6}> 
                       <h1>Comprado:</h1>
                       {showContainer}
                        </Col>
                   </Row>
               </Container>
               
               
            </div>
        ) : (
          <div style={{textAlign: 'center'}}>
          <br></br>
        <div style={{width: "100px",  height: "100px"}}  className="spinner-border" role="status">
          <span  className="visually-hidden">Loading...</span>
        </div>
        </div>
        )}
    </div>
)

}
export default ViewPurchase;