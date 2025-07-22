import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/security/AuthContext";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import "./Login.css";

export default function Login() 
{
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(user, pass)) {
      navigate("/");
    } else {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <section className="loginSection">
      <Container className="box">
        <Row>
          <Col mb={4} className="info text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="title">Login</div>
          </Col>
        </Row>
        <Row>
          <Col mb={4}>  
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="issue-title">Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="issue-title">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="btnIngresar w-100">Ingresar</Button>
            </Form>
        </Col>
      </Row>
    </Container>
    
    </section>
  );
}