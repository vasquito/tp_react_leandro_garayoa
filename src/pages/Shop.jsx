import React from "react";
import "./Shop.css"
import { Fragment, useContext} from "react";
import { Container } from "react-bootstrap";
import Banner from "../components/Banner";
import Wrapper from "../components/Wrapper";
import ShopList from "../components/ShopList";
import { CartContext } from "../context/CartContext";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Products=()=> {
    const {products, isLoading, error, addToCart } = useContext(CartContext);
    useWindowScrollToTop();

    if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

    return (
      <Fragment>
        <Banner title={"Libros / Historietas"} />
        <Wrapper />
        <section className="shop">
          <Container>
            <ShopList products={products} />
          </Container>
        </section>
      </Fragment>
    );
};

export default Products;