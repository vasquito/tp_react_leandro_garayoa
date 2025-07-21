import React, { useContext } from "react";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/security/AuthContext";


function LogOutButton() {
    const { setLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        // Simular logout
        setLoggedIn(false);
    };

    return (
        <Nav.Link as={Link} to="/" onClick={handleLogout} className="navbar-link" aria-label="Ir a login">
            <span className="nav-link-label">Cerrar Sesión</span>
        </Nav.Link>
    )
}

export default LogOutButton