import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import AdmProducts from "./pages/AdmProducts";
import Login from "./pages/Login";
import { AuthProvider } from "./context/security/AuthContext";
import ProtectedRoute from "./context/security/ProtectedRoute";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <AuthProvider>
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
            <Header/>
            <Menu />
          </div>
          <div id="content">
            <Routes>
                <Route path='/' element={<Home/>}  />
                <Route path='/shop' element={<Shop/>}  />
                <Route path="/shop/:id" element={<Product />} />
                <Route path="/admProducts" element={
                  <ProtectedRoute>
                     <AdmProducts /> 
                  </ProtectedRoute>
                } />
                <Route path='/cart' element={
                  <Cart/>
                } />
                <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <div id="footer">
            <Footer/>
          </div>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App