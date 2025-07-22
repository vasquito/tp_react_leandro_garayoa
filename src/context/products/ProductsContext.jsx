import { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext();

export function ProductsProvider ({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [products, setProducts] = useState([]);
    const [news, setNews] = useState([]);

    const API_URL_PRODUCTS = "https://685340fb0594059b23d07cd8.mockapi.io/api/productos";
    const API_URL_NEWS = "https://685340fb0594059b23d07cd8.mockapi.io/api/novedades";

    // Fetch de libros desde mi json sobre el contexto
    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL_PRODUCTS)
            .then((res) => {
                if (!res.ok) throw new Error("Error de carga, status:" + res.status);
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
            .finally(() => setTimeout(() => setIsLoading(false), 500));
    }, []);

    // Fetch de novedades desde mi json sobre el contexto
    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL_NEWS)
            .then((res) => {
                if (!res.ok) throw new Error("Error de carga, status:" + res.status);
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
            .finally(() => setTimeout(() => setIsLoading(false), 500));
    }, []);


    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL_PRODUCTS);
            if (!res.ok) throw new Error("Error de carga, status:" + res.status);
            const data = await res.json();
            console.log("Productos recibidos: " + data);
            setProducts(data)
        } catch (err) {
            const errorMessage = err.name === 'TypeError'
                ? "No se pudo conectar con el servidor"
                : err.message;
            setError(errorMessage);
            console.error("Error de carga de API", err);
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    return (
        <ProductsContext.Provider
            value={{
                isLoading, // Estado de carga
                error, // Manejo de errores
                products, // Productos
                news, // Novedades
                fetchProducts, // Carga productos
                API_URL_PRODUCTS
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


