import React, { useContext } from "react";
import { AuthContext } from "../context/security/AuthContext";


function LogOutButton() {
    const { setLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        // Simular logout
        setLoggedIn(false);
    };

    return (
        <div>
            <button className="logout" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default LogOutButton