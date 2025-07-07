import { useState, useContext } from 'react';
import "./Navbar.css";
import logo from "../assets/images/logo.png";
import { Navbar,Nav,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../context/products/CarritoContext";
import { AuthContext } from "../context/security/AuthContext";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogoutButton";


const Navegacion = () => {

  const { cartItems } = useContext(CartContext);
  const isLoggedIn = useContext(AuthContext).loggedIn;
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  

  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  const styleImg={maxWidth:"60%", maxHeight:"60%"}; 

  return (
    <Navbar fixed="top" expand="md" className={isFixed ? "navbar fixed" : "navbar"}>
      <Container className='navbar-container'>
        <Navbar.Brand to="/">
          <img src={logo} style={styleImg} />
        </Navbar.Brand>

        {/* Media cart and toggle */}
        <div className="d-flex">
          <div className="media-cart">
              <Link
                aria-label="Ir a Mis Pedidos"
                to="/cart"
                className="cart"
                data-num={totalQuantity}
              >
                <FontAwesomeIcon icon={faCartShopping} style={{color:"#F2D324", height:"24px"}}/>
              </Link>
              {isLoggedIn ? (<LogOutButton />) : (<LogInButton />)}
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link 
                aria-label="Ir a la pagina Principal" 
                className="navbar-link" 
                to="/"
                onClick={() => setExpand(false)}>
                  <span className="nav-link-label">Principal</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link 
                aria-label="Ir a la pagina de Libros" 
                className="navbar-link" 
                to="/shop"
                onClick={() => setExpand(false)}>                  
                  <span className="nav-link-label">Libros</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                aria-label="Ir a Mis Pedidos"
                className="navbar-link"
                to="/cart"
                onClick={() => setExpand(false)}>
                <span className="nav-link-label">Mis pedidos</span>
              </Link>
            </Nav.Item>
            
            <Nav.Item className="expanded-cart">
              <Link
                aria-label="Ir al Carrito"
                to="/cart"
                className="cart"
                data-num={totalQuantity}
              >
                <FontAwesomeIcon icon={faCartShopping} style={{color:"#F2D324", height:"24px"}}/>
              </Link>
            </Nav.Item>
            <Nav.Item className="expanded-cart">
              {isLoggedIn && (
                <Link
                  aria-label="Ir a Mis Pedidos"
                  className="navbar-link"
                  to="/admin"
                  onClick={() => setExpand(false)}>
                  <span className="nav-link-label">Administracion</span>
                </Link>
              )}
              {isLoggedIn ? (<LogOutButton />) : (<LogInButton />)}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;