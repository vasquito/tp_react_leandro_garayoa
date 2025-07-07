import React, { useContext } from "react";
import { AuthContext } from "../context/security/AuthContext";
import { useNavigate } from "react-router-dom";


function LogInButton() {
  const navigate = useNavigate();
  //const { setLoggedIn } = useContext(AuthContext);

  const handleLogin = () => {
    // Simular login
    //setLoggedIn(true);
    //console.log("Login habilitado")
    navigate("/login");
  };

  return (
    <div>
      <button className="login" onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default LogInButton