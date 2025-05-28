import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import ProductDetails from "../components/ProductDetails";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const {products} = useContext(CartContext);

  useEffect(() => {
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    
    window.scrollTo(0, 0); 
  }, [products, selectedProduct, id]);
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.title} />
      <section className="shop">
      <ProductDetails selectedProduct={selectedProduct} />
      </section>
    </Fragment>
  );
};

export default Product;
