// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { axiosPrivate } from "@/api/axios";
import { authenticateWithFirebase } from "@/utils/firebase-auth";
import { auth as firebaseAuth } from "@/config/firebase-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        access_token: null,
        firebaseUID: null,
        username: null,
    });

    const initializeFirebaseAuth = async (access_token) => {
        try {
            const response = await axiosPrivate.get("/get-firebase-token", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await authenticateWithFirebase(response.data.firebaseToken);
            setAuth((prev) => ({
                ...prev,
                firebaseUID: firebaseAuth.currentUser.uid,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const signup = async (username, password) => {
        try {
            const response = await axiosPrivate.post(
                "/signup",
                {
                    username,
                    password,
                },
                {}
            );

            await initializeFirebaseAuth(response.data.access_token);

            setAuth((prev) => ({
                ...prev,
                username,
                access_token: response.data.access_token,
            }));

            localStorage.setItem("authToken", response.data.access_token);
            localStorage.setItem("username", username);
        } catch (error) {
            setAuth((prev) => ({
                ...prev,
                username: null,
                access_token: null,
                firebaseUID: null,
            }));

            localStorage.removeItem("authToken");
            localStorage.removeItem("username");

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Failed to create account. Please try again.");
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axiosPrivate.post("/login", {
                username,
                password,
            });

            await initializeFirebaseAuth(response.data.access_token);

            setAuth((prev) => ({
                ...prev,
                username,
                access_token: response.data.access_token,
            }));

            localStorage.setItem("authToken", response.data.access_token);
            localStorage.setItem("username", username);
        } catch (error) {
            setAuth((prev) => ({
                ...prev,
                username: null,
                access_token: null,
                firebaseUID: null,
            }));

            localStorage.removeItem("authToken");
            localStorage.removeItem("username");

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Failed to log in. Please try again.");
        }
    };

    const logout = async () => {
        try {
            await axiosPrivate.get("/logout");
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");
            setAuth((prev) => ({
                ...prev,
                username: null,
                access_token: null,
                firebaseUID: null,
            }));
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                signup,
                login,
                logout,
                initializeFirebaseAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
