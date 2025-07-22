import { useContext } from "react";
import { CartContext } from "../context/products/CarritoContext";
import { Table, Col, Container, Row } from "react-bootstrap";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Swal from "sweetalert2";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems
        .reduce((price, item) => price + item.price * item.quantity, 0)
        .toFixed(2);

  const enviar = () => {
    const phoneNumber = '+5491161058210'; // Reemplaza con tu número de teléfono
    
    var pedidos = '';
    cartItems.map((item) => {
      pedidos += '- ['+item.quantity+'] '+item.title+' - P. Unit: $'+item.price+'.00\n';
    });
    pedidos  += `----------------------------------\n`;
    pedidos  += `Total: $${total.toLocaleString()}\n`;
    pedidos  += `----------------------------------\n`;
    var message = 'Hola, mi pedido es:\n'+pedidos+'\nGracias.'; 
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    //clearCart();
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();

        Toastify({
          text: "Carrito vaciado",
          duration: 2000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ffc107",
        }).showToast();
      }
    });
  };

  return (
    <section className="cart-items">
      <Container >
        <Row className="justify-content-center">
          <Col md={8}>
            {cartItems.length === 0 && (
              <h1 className="no-items product">No hay articulos añadidos al pedido</h1>
            )}
            <div className="vaciar-carrito">
              {cartItems.length > 0 && (
                <button onClick={vaciarCarrito} className="vaciar">Vaciar carrito</button>
              )} 
            </div>
            {
              cartItems.length > 0 && (
                <div className="cart-list table-responsive" >
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th className="header">Foto</th>
                        <th className="header">Titulo</th>
                        <th className="header">Precio</th>
                        <th className="header">Cantidad</th>
                        <th className="header">Total</th>
                        <th className="header">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      cartItems.map((item) => {
                        const productQty = item.price * item.quantity;
                        return (
                            <tr key={item.id}>
                              <td className="image-holder"><img src={item.cover} alt="" /></td>
                              <td className="item">{item.title}</td>
                              <td className="item">${item.price}.00</td>
                              <td className="item">{item.quantity}</td>
                              <td className="item">${productQty}.00</td>
                              <td className="item">
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
                              </td>
                            </tr>
                        );
                      })
                    }
                    </tbody>
                  </Table>
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
            <div className="enviar-pedido">
              <br/>
              {cartItems.length > 0 && (
                <button onClick={enviar} className="enviar">
                  <FontAwesomeIcon icon={faWhatsapp} className="wsp-icon" />&nbsp;Enviar Pedido
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
