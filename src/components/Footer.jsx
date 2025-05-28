import React from "react"
import "./Footer.css"
import { Col, Container, Row } from "react-bootstrap"
import { IconMdiEmailOutline} from '../assets/ionicons/IconMdiEmailOutline.tsx';
import { IconIonLogoWhatsapp } from '../assets/ionicons/IconIonLogoWhatsapp.tsx';
import { IconIonLocation } from '../assets/ionicons/IconIonLocation.tsx';
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={5} sm={3} className='box' style={{textAlign:'center'}}>
              <img src={logo} className='logo' />
              <p>© Creado por Ing. Leandro Garayoa - 2025</p>
            </Col>
            <Col md={7} sm={9} className='box'>
              <h2>Contacto</h2>
              <p><IconIonLocation width="24px" height="24px" style={{color: "#ff5733"}}/>Versalles, Ciudad Autonoma de Buenos Aires, Argentina </p>
              <p><IconMdiEmailOutline width="24px" height="24px" style={{color: "#F2D324"}} /> comics.lean@gmail.com</p>
              <p><IconIonLogoWhatsapp width="24px" height="24px" style={{color: "#25d366"}}/> 32423423 </p>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
