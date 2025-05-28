import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Admin=()=>
    {
        return(
            <section className="cart-items">
                <Container >
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h1 className="no-items product">Administracion</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    };

export default Admin;