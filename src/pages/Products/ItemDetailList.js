import FireBaseApi from "../../Components/ProductsApi"
import { Link } from "react-router-dom";
import {Image,  Divider, Header, Segment, Label} from "semantic-ui-react"
import Category from '../Category/Category'
import { Container, Row, Col  } from 'react-bootstrap';
import ApiDolar from "../../Components/ApiDolar"
import AOS from 'aos';
// import UserApi from "../../Components/UserApi"
AOS.init();
// className="justify-content-md-center"
const Items = () => {
  const data = FireBaseApi();
  const dolarApi = ApiDolar();
  let products
  if (data!==undefined && dolarApi!==undefined) {
    products = data.map(product => {
      return (
    <div  data-aos-delay='50' data-aos='fade-up' data-aos-offset='100' style={{width: '25rem'}} key={product.id}>
      
      {/* CAMBIAR ACA */}
      {product.stock >=1 ? (
      <div> 
      <Col style={{paddingTop: '20px'}}>
      <Segment>
        <div>
        <Header>
        <Link to={`products/${product.id}`}><h6 style={{justifyContent: 'center', display: 'flex'}}>{product.title}</h6></Link>
        </Header>
        <Divider clearing />
        <Link to={`products/${product.id}`}>
        <Image style={{height: "150px"}} src={`${product.img[0]}`} rounded  centered />
        </Link>
        <Divider clearing />
       
        <div>
        <div style={{display: "flex", justifyContent: "center"}}>
        
        <Label style={{alignSelf: "center"}} circular color={'green'} empty key={'green'} /> 
        <p> En stock | ${product.price*dolarApi}</p>
        </div>
      </div>
      </div>
      </Segment>
      
      </Col> 
      </div> 
      ) : (
      <div>
      <Col style={{paddingTop: '20px'}}> 
        <Segment>
        <div> 
        <Header>
        <h6 style={{justifyContent: 'center', display: 'flex'}}>{product.title}</h6>
        </Header>
        <Divider clearing />
        
        <Image style={{height: "150px"}} src={`${product.img[0]}`} rounded  centered />

        <Divider clearing />
      <div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <Label style={{alignSelf: "center"}} circular color={'red'} empty key={'red'} /> 
        <p> Sin stock | ${product.price*dolarApi}</p>
        </div>
      </div>
      </div> 
      </Segment>
      
      </Col> 
      </div> 
      )}  
   </div>
      );
    });
  }
  
  return (
  
    <Container style={{
      maxWidth: '100%',
      paddingRight: '0px',
      paddingLeft: '0px',
      marginRight: 'auto',
      marginLeft: 'auto',
      background: '#EAEAEA'
    }}>
      <Row>
      <Col md={2}> <Category /> </Col>
      {data===undefined ? (
        <div className="d-flex col-md-12  justify-content-center">
          <br></br>
        <div style={{width: "100px",  height: "100px"}}  className="spinner-border" role="status">
          <span  className="visually-hidden">Loading...</span>
        </div>
        </div>
      ) : (
        <Col md={10}>
          <Container style={{ maxWidth: '100%'}}>
          <Row style={{ maxWidth: '100%', justifyContent: 'center'}}>
            {products}
           </Row>
          </Container>

        </Col>
      )}
    </Row>
    </Container>
 
  );
};

export default Items;
