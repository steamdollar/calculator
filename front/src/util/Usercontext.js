import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
        const [cookies] = useCookies(["userInfo"]); // The name of your cookie
        const [authState, setAuthState] = useState({
                isAuthenticated: !!cookies.userInfo,
                userInfo: cookies.userInfo || null,
        });

        useEffect(() => {
                // If the userInfo cookie is present, set the user state to its value
                setAuthState({
                        isAuthenticated: !!cookies.userInfo,
                        userInfo: cookies.userInfo || null,
                });
        }, [cookies]);

        return (
                <AuthContext.Provider value={{ authState }}>
                        {children}
                </AuthContext.Provider>
        );
};
