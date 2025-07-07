import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from "./context/products/CarritoContext";
import { ProductsProvider } from "./context/products/ProductsContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
)
