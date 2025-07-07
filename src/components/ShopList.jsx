import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard";

const ShopList = ({ products }) => {
  useEffect(() => {}, [products]);
  //if (products.length === 0) {
  //  return <h1 className="not-found">Producto No encontrado!!</h1>;
  //}
  return (
    <Row className="justify-content-center">
      {products.map((productItem) => {
        return (
          <ProductCard
            key={productItem.id}
            productItem={productItem}
          />
        );
      })}
    </Row>
  );
};
export default ShopList;
