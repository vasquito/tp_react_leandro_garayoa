import { createContext, useState} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const addNumToCart = (product, num) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + parseInt(num) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: parseInt(num) }];
        });
    };

    const clearCart = () => setCartItems([]);

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cartItems, // Elementos del carrito
                addToCart, // Función para agregar productos al carrito
                addNumToCart, // Función para agregar N productos al carrito
                decreaseQuantity, // Función para disminuir la cantidad de un producto en el carrito
                removeFromCart, // Función para eliminar un producto del carrito
                clearCart // Función para limpiar el carrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
