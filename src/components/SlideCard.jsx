import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


const SlideCard = ({id_book,title,cover,store_date}) => {
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${id_book}`);
  };
  return (
      <Container className='box' >
        <Row>
          <Col md={3} className="cover"><center><img src={cover} alt="#" /></center></Col>
          <Col md={10} className="info" >
            <div className="title">{title}</div>
            {/*<h4>${price o rating}</h4>*/}
            <div>
              <Row>
                  <Col md={8} className="title-info">
                    <h3 className="issue-title">Comics #{id_book}</h3>
                    <p>Ultimo lanzamiento: {store_date}</p> 
                  </Col>
                  <Col md={4} style={{textAlign:'center'}}>        
                    <Button className="btnViewDetail" onClick={() => handelClick()}>Ver mas detalles</Button>
                  </Col>
              </Row>           
            </div>
          </Col>
        </Row>
    </Container>
  )
}

export default SlideCard
