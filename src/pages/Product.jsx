import { Fragment } from "react";
import { useParams } from "react-router-dom";
import useWindowScrollToTop from "../utils/useWindowScrollToTop";
import getProduct from "../context/products/ProductsContext";
import Banner from "../components/Banner";
import ProductDetails from "../components/ProductDetails";

const Product = () => {
  const {id} = useParams();
  const selectedProduct = getProduct(id);
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
