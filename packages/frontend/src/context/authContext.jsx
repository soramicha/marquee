import { createContext, useContext, useState } from 'react';
import axios from "@/api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ access_token: null });

    const login = async (username, password) => {
        try {
            const response = await axios.post("/signup", {
                username,
                password
            });
            setAuth({ access_token: response.data.token});
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};