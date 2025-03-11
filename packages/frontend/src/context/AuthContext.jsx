import { createContext, useContext, useState } from "react";
import { axiosPrivate } from "@/api/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ username: null, access_token: null });

    const signup = async (username, password) => {
        /*try {
            const response = await axiosPrivate.post("/signup", {
                username,
                password,
            });
            setAuth({
                username: username,
                access_token: response.data.access_token,
            });
        } catch (error) {
            throw error;
        }*/
        const response = await axiosPrivate.post("/signup", {
            username,
            password,
        });
        setAuth({
            username: username,
            access_token: response.data.access_token,
        });
    };

    // TODO: redirect user on successful login to home page/feed page
    const login = async (username, password) => {
        try {
            const response = await axiosPrivate.post("/login", {
                username,
                password,
            });
            setAuth({ access_token: response.data.access_token });
            localStorage.setItem('authToken', response.data.access_token)
            localStorage.setItem('username', username)
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async (username) => {
        setAuth(null);
        try {
            await axiosPrivate.post("/logout", { username });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
