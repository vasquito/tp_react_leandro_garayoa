import React from "react"
import "./Wrapper.css"
import { Col, Container, Row } from "react-bootstrap"
import marvel from "../assets/images/marvel.gif";
import dc from "../assets/images/dc_logo.jpg";
import starwars from "../assets/images/starwars.jpg";

const Wrapper = () => {
  
  return (
      <section className='wrapper'>
        <Container>
          <Row>
             <Col md={3} sm={5} xs={9} className='feature'> 
                 <img src={marvel} style={{height:"80px"}} />
              </Col>  
              <Col md={3} sm={5} xs={9} className='feature'> 
                 <img src={dc} style={{height:"80px"}} />
              </Col>  
              <Col md={3} sm={5} xs={9} className='feature'> 
                 <img src={starwars} style={{height:"90px"}} />
              </Col>
          </Row>
        </Container>
      </section>
  )
}

export default Wrapper
