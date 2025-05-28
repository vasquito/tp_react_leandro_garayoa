import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({title, productItem }) => {
  const {isLoading, error, addToCart } = useContext(CartContext);

  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handelAdd = (productItem) => {
      addToCart(productItem);
      toast.success("El producto: " + productItem?.title +" (1) ha sido añadido al carrito !!!");
  };
  
  if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
  if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

  return (
    <Col md={3} sm={10} className="product">
      <img
        loading="lazy"
        //onClick={() => handelClick()}
        src={productItem.cover}
        alt=""
      />
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.title}</h3>
        <div className="rate">
          <FontAwesomeIcon icon={faStar} style={{height:"18px"}}/>
          <FontAwesomeIcon icon={faStar} style={{height:"18px"}}/>
          <FontAwesomeIcon icon={faStar} style={{height:"18px"}}/>
          <FontAwesomeIcon icon={faStar} style={{height:"18px"}}/>
          <FontAwesomeIcon icon={faStar} style={{height:"18px"}}/>
        </div>
        <div className="price">
          <h4>${productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <FontAwesomeIcon icon={faPlus} style={{height:"24px"}}/>
          </button>
        </div>
        <div className="title"><b>{productItem.title}</b></div>
        <div className="button">
          <Button className="btnViewDetail" onClick={() => handelClick()}>Ver mas detalles</Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
