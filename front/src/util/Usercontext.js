import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Create a context
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
        const [cookies] = useCookies(["userInfo"]); // The name of your cookie
        const [user, setUser] = useState(null);

        useEffect(() => {
                // If the userInfo cookie is present, set the user state to its value
                if (cookies.userInfo) {
                        setUser(cookies.userInfo);
                }
        }, [cookies]);

        return (
                <AuthContext.Provider value={{ user, setUser }}>
                        {children}
                </AuthContext.Provider>
        );
};
