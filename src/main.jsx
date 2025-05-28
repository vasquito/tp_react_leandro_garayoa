import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
  </StrictMode>
)
