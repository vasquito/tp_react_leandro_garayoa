import "./Header.css";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LogInButton() {
  //const navigate = useNavigate();

  const handleLogin = () => {
    // Simular login
    //setLoggedIn(true);
    //console.log("Login habilitado")
    //navigate("/login");
  };

  return (
    <Nav.Link as={Link} to="/Login" className="navbar-link" aria-label="Ir a login">
         <span className="nav-link-label">Iniciar Sesión</span>
    </Nav.Link>
  )
}

export default LogInButton