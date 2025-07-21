import React from "react";
import "./Shop.css"
import { Fragment, useContext} from "react";
import { Container } from "react-bootstrap";
import Banner from "../components/Banner";
import ShopList from "../components/ShopList";
import { ProductsContext } from "../context/products/ProductsContext";
import useWindowScrollToTop from "../utils/useWindowScrollToTop";

const Products=()=> {
    const {products, isLoading, error } = useContext(ProductsContext);  
    useWindowScrollToTop();

    if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

    return (
      <Fragment>
        <Banner title={"Libros / Historietas"} />
        {/*<Wrapper />*/}
        <section className="shop">
          <Container>
            <ShopList products={products} />
          </Container>
        </section>
      </Fragment>
    );
};

export default Products;