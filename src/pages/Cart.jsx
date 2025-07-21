import { useContext } from "react";
import { CartContext } from "../context/products/CarritoContext";
import { Col, Container, Row } from "react-bootstrap";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems
        .reduce((price, item) => price + item.price * item.quantity, 0)
        .toFixed(2);

  const pagar = () => {
    Swal.fire({
      title: "¡Gracias por tu compra!",
      text: `Total: $${total.toLocaleString()}`,
      icon: "success",
    });
    clearCart();
  };


  return (
    <section className="cart-items">
      <Container >
        <Row className="justify-content-center">
          <Col md={8}>
            {cartItems.length === 0 && (
              <h1 className="no-items product">No hay articulos añadidos al pedido</h1>
            )}
            {
              cartItems.length > 0 && (
                <div className="cart-list" >
                  <Row className="table-dark">
                    <Col className="header">Foto</Col>
                    <Col className="header">Titulo</Col>
                    <Col className="header">Precio</Col>
                    <Col className="header">Cantidad</Col>
                    <Col className="header">Total</Col>
                    <Col></Col>
                  </Row>
                  {
                    cartItems.map((item) => {
                      const productQty = item.price * item.quantity;
                      return (
                          <Row >
                            <Col className="image-holder"><img src={item.cover} alt="" /></Col>
                            <Col className="item">{item.title}</Col>
                            <Col className="item">${item.price}.00</Col>
                            <Col className="item">{item.quantity}</Col>
                            <Col className="item">${productQty}.00</Col>
                            <Col className="cartControl">
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
                      );
                    })
                  }
                </div>
              )
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
              )}&nbsp;&nbsp;&nbsp;
              {cartItems.length > 0 && (
                <button onClick={pagar} className="pagar">
                  Pagar
                </button>
              )}
              <br/><br/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Cart;
