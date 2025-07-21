import { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext();

export function ProductsProvider ({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [products, setProducts] = useState([]);
    const [news, setNews] = useState([]);


    // Fetch de libros desde mi json sobre el contexto
    useEffect(() => {
        setIsLoading(true);
        fetch("https://685340fb0594059b23d07cd8.mockapi.io/api/productos")
            .then((res) => {
                if (!res.ok) throw new Error("Error de carga, status:" + response.status);
                return res.json();
            })
            .then((data) => {
                console.log("Productos recibidos: " + data);
                setProducts(data)
            })
            .catch((err) => {
                console.error("Error de carga de API", err);
                setError(err.message)
            })
            .finally(() => setIsLoading(false));
    }, []);

    // Fetch de novedades desde mi json sobre el contexto
    useEffect(() => {
        setIsLoading(true);
        fetch("https://685340fb0594059b23d07cd8.mockapi.io/api/novedades")
            .then((res) => {
                if (!res.ok) throw new Error("Error de carga, status:" + response.status);
                return res.json();
            })
            .then((data) => {
                console.log("Novedades recibidos: " + data);
                setNews(data)
            })
            .catch((err) => {
                console.error("Error de carga de API", err);
                setError(err.message)
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                isLoading, // Estado de carga
                error, // Manejo de errores
                products, // Productos
                news, // Novedades
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

const getProduct = (id) => {
    const { products } = useContext(ProductsContext);
    const [selectedProduct, setSelectedProduct] = useState([]);
    
    useEffect(() => {
        setSelectedProduct(
            products.filter((item) => parseInt(item.id) === parseInt(id))[0]
        );
    }, [products, selectedProduct, id]);

    return selectedProduct;
}
export default getProduct;
