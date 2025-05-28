import { lazy } from "react";
import { useState } from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authRoutesProtection } from "./utils/authRoutesProtection";


const ProtectedAdmin = authRoutesProtection(Admin);

function App() {

  return (
    <div id="wrapper">
      <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      <Router>
        <div id="header">
          <NavBar/>
        </div>
        <div id="content">
          <Routes>
              <Route path='/' element={<Home/>}  />
              <Route path='/shop' element={<Shop/>}  />
              <Route path="/shop/:id" element={<Product />} />
              <Route path="/admin" element={<ProtectedAdmin />} />
              <Route path='/cart' element={<Cart/>}  />
          </Routes>
        </div>
        <div id="footer">
          <Footer/>
        </div>
      </Router>
    </div>
  )
}

export default App