import { useContext } from 'react';
import "./Menu.css";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/security/AuthContext";


const Menu = () => {

  const isLoggedIn = useContext(AuthContext).loggedIn;
  
  return (
    <Nav className="flex-row justify-content-center gap-5">
      <Nav.Link as={Link} className="navbar-link" to="/" ><span className="nav-link-label-menu">Novedades</span></Nav.Link>
      <Nav.Link as={Link} className="navbar-link" to="/shop" ><span className="nav-link-label-menu">Libros</span></Nav.Link>
      <Nav.Link as={Link} className="navbar-link" to="/cart" ><span className="nav-link-label-menu">Mis Pedidos</span></Nav.Link>
    </Nav>
  );
};

export default Menu;