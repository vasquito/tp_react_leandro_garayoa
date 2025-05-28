import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Col, Container, Row } from "react-bootstrap";
import "./Cart.css";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems
        .reduce((price, item) => price + item.price * item.quantity, 0)
        .toFixed(2);

  useWindowScrollToTop();
  return (
    <section className="cart-items">
      <Container >
        <Row className="justify-content-center">
          <Col md={8}>
            {cartItems.length === 0 && (
              <h1 className="no-items product">No hay articulos añadidos al pedido</h1>
            )}
            {
              cartItems.map((item) => {
                const productQty = item.price * item.quantity;
                return (
                  <div className="cart-list" key={item.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.cover} alt="" />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.title}</h3>
                            <h4>
                              ${item.price}.00 * {item.quantity}
                              <span>${productQty}.00</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="addCart"
                              onClick={() => addToCart(item)}
                            >
                              <FontAwesomeIcon icon={faAdd}/>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <FontAwesomeIcon icon={faTimes}/>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar Producto
                      </button>
                    </Row>
                  </div>
                );
              })
            }
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Resumen del Pedido</h2>
              <div className=" d_flex">
                <h4>Saldo Total:</h4>
                <h3>$ {total}</h3>
              </div>
            </div>
            <div className="vaciar-carrito">
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="vaciar">
                  Vaciar carrito
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Cart;
