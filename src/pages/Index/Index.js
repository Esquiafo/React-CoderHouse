import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Row, Container, Col } from "react-bootstrap";
import IndexCategory from "../Category/IndexCategory"
import IndexItem from "../Products/IndexItem";
const Home = () => {
  return (
    <div style={{background: '#EAEAEA'}}>
     <Container>
       <Row>
         <Col><IndexItem /></Col>
         <Col><IndexCategory /></Col>
       </Row>
     </Container>
    </div>
  );
};

export default Home;
