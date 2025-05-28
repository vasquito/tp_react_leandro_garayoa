import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";


function LogInButton() {
  const { setLoggedIn } = useContext(CartContext);

  const handleLogin = () => {
    // Simular login
    setLoggedIn(true);
  };

  return (
    <div>
      <button className="login" onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default LogInButton