import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Col, Container, Row } from "react-bootstrap";

export default function ProtectedRoute({ children }) 
{
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/" />;
}

/*
export const ProtectedRoute = (Component) => {
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
export default AuthRoutesProtection;
*/