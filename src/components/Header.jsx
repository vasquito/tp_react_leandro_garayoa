import { useState, useContext } from 'react';
import "./Header.css";
import logo from "../assets/images/logo.png";
import { Navbar,Nav,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../context/products/CarritoContext";
import { AuthContext } from "../context/security/AuthContext";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogoutButton";


const Header = () => {

  const {cartItems}  = useContext(CartContext);
  const isLoggedIn = useContext(AuthContext).loggedIn;
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
  

  return (
    <Navbar fixed="top" expand="md" className={isFixed ? "navbar fixed" : "navbar"}>
      <Container className='navbar-container'>
        <Nav.Link as={Link} to="/">
          <img src={logo} className="logo" />    
        </Nav.Link>

        {/* Media cart and toggle */}
        <div className="media-cart">
          <Nav.Link as={Link} aria-label="Ver mis pedidos" to="/cart" className="cart" data-num={totalQuantity}>
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          </Nav.Link>
        </div>  
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span></span>
            <span></span>
            <span></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item className="expanded-cart">
              <Nav.Link as={Link} aria-label="Ver mis pedidos" to="/cart" className="cart" data-num={totalQuantity}>
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {isLoggedIn && (
                    <Nav.Link as={Link} className="navbar-link" to="/admProducts"><span className="nav-link-label">Adm. Productos</span></Nav.Link>
                  )}
            </Nav.Item>      
            <Nav.Item >
              {isLoggedIn ? (<LogOutButton />) : (<LogInButton />)}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;