import { Col, Container, Row } from "react-bootstrap";
import "./Banner.css";
import bannerBg from "../assets/images/banner_2.jpg";

const Banner = ({title}) => {
    return ( 
        <div className="image-container">
            <img src={bannerBg} alt="banner-bg" />
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;