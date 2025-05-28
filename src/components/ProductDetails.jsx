import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ProductDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const ProductDetails = ({ selectedProduct }) => {
  const {addNumToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    addNumToCart(selectedProduct, quantity);
    toast.success("El producto: " + selectedProduct?.title +" ("+quantity+") ha sido añadido al carrito !!!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={3}>
            <img loading="lazy" src={selectedProduct?.cover} alt="" />
          </Col>
          <Col md={6}>
            <Container>
              <Row className="justify-content-center">
                <Col md={12}>
                  <h2>{selectedProduct?.title}</h2>
                  <span><b>Categoria</b>: {selectedProduct?.category}</span>
                </Col>
              </Row>
              <Row className="info">
                <Col><span className="price">${selectedProduct?.price}</span></Col>
                <Col>
                  <div className="rate">
                    <div className="stars">
                      <FontAwesomeIcon icon={faStar}/>
                      <FontAwesomeIcon icon={faStar}/>
                      <FontAwesomeIcon icon={faStar}/>
                      <FontAwesomeIcon icon={faStar}/>
                      <FontAwesomeIcon icon={faStar}/>
                    </div>
                    <span>{selectedProduct?.rating} ratings</span>
                  </div>
                </Col>
              </Row>
              <Row className="info">
                <Col><div className="description" dangerouslySetInnerHTML={{ __html: selectedProduct?.desc}}/></Col>
              </Row>
              <Row>
                <Col>
                  <input
                    className="cantidad-input"
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Col>
                <Col>
                  <button
                    aria-label="Add"
                    type="submit"
                    className="add"
                    onClick={() => handelAdd(selectedProduct, quantity)}
                  >
                    Agregar a mis pedidos
                  </button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
