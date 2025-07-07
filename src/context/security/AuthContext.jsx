import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    /*
    useEffect(() => 
    {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
            setLoggedIn(true);
        }
            
    }, []);
    */

    const login = (username, password) => 
    {
        if (username === "admin" && password === "1234") 
        {
            const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
            setToken(tokenFalso);
            setUser(username);
            setLoggedIn(true);
            localStorage.setItem("token", tokenFalso);
            localStorage.setItem("user", username);
            return true;
        }
        return false;
    };
    
    const logout = () => 
    {
        setToken(null);
        setUser(null);
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                token, // Token
                user, // Usuario
                loggedIn, // Estado de autenticación
                setLoggedIn,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);