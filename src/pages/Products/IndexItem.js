import {Link} from "react-router-dom"
import React from 'react';
import FireBaseApi from "../../Components/ProductsApi.js";
import { Image, Segment, Divider, Header } from 'semantic-ui-react'
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';

import { SwiperSlide, Swiper} from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";

const IndexItem = () => {

  const data = FireBaseApi()
  let stockedProducts=[]
  let randomStocked
  let products=[]
  let randomPasado = []
  if (data!==undefined) {
   
    data.map(x=> x.stock>=1 ? products.push(x): null)
    while (stockedProducts.length < 5) {
     
    //Genero un numero random
    let random = Math.floor(Math.random() * products.length).toFixed();
    //Busco si esta en el array y si no esta lo agrego
    if(!randomPasado.includes(random)) {
        randomPasado.push(random);
        stockedProducts.push(products[random])
    }
      
    }
    //Mapeo los elementos random de la lista creada
    randomStocked = stockedProducts.map(product => {
      return (

     <SwiperSlide key={product.id}>
     <Segment>
        <div>
        <Header>
        <Link to={`products/${product.id}`}><h4 style={{justifyContent: 'center', display: 'flex'}}>{product.title}</h4></Link>
        </Header>
        <Divider clearing />
        <Link to={`products/${product.id}`}>
        <Image style={{height: "250px"}} src={`${product.img[0]}`} rounded  centered />
        </Link>
       

      </div>
      </Segment>

     </SwiperSlide>
      );
    });
  }
  
  return (

<div>
{randomStocked!==undefined ? (

  <div>
  <h1 style={{textAlign: 'center'}}>Algunos productos</h1>
  <Swiper
   // install Swiper modules
   modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
   spaceBetween={85}
   navigation={true}
   pagination={{ clickable: true }}
   centeredSlides={true}
   slidesPerView={1}
   autoplay={{
     delay: 3000,
     disableOnInteraction: false
   }}
   
  
 >
   {randomStocked}
   </Swiper>
 </div>

) : (

  <div style={{textAlign: 'end'}}>
  <br></br>
<div style={{width: "100px",  height: "100px"}}  className="spinner-border" role="status">
  <span  className="visually-hidden">Loading...</span>
</div>
</div>
)}
  



        
  </div>
  );
};

export default IndexItem;