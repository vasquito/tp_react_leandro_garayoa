import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Col, Container, Row } from "react-bootstrap";

export const useAuth = () => {
    const { loggedIn } = useContext(CartContext);
    return { loggedIn };
};
export const authRoutesProtection = (Component) => {
    return (props) => {
        const { loggedIn } = useAuth();

        if (!loggedIn) {
            return (
                <section className="cart-items">
                    <Container >
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <h1 className="no-items product">Acceso denegado. Por favor, inicia sesión.</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
            );
        }

        return <Component {...props} />;
    };
};
export default authRoutesProtection;