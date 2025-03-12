import { createContext, useContext, useState } from 'react';
import { axiosPrivate } from '@/api/axios';
import { authenticateWithFirebase } from '@/utils/firebase-auth';
import { auth as firebaseAuth } from "@/config/firebase-config";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ access_token: null, firebaseUID: null });

    const initializeFirebaseAuth = async (access_token) => {
        try {
            const response = await axiosPrivate.get("/get-firebase-token", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            await authenticateWithFirebase(response.data.firebaseToken);
            setAuth(prev => ({
                ...prev,
                firebaseUID: firebaseAuth.currentUser.uid
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const signup = async (username, password) => {
        try {
            const response = await axiosPrivate.post("/signup", {
                username,
                password
            });
            setAuth(prev => ({
                ...prev,
                access_token: response.data.access_token
            }));
            await initializeFirebaseAuth(response.data.access_token);
        } catch (error) {
            throw error;
        }
    };

    // TODO: redirect user on successful login to home page/feed page
    const login = async (username, password) => {
        try {
            const response = await axiosPrivate.post("/login", {
                username,
                password
            });
            setAuth(prev => ({
                ...prev,
                access_token: response.data.access_token
            }));
            await initializeFirebaseAuth(response.data.access_token);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        setAuth(prev => ({
            ...prev,
            username: null,
            access_token: null,
            firebaseUID: null
        }));        
        try {
            const response = await axiosPrivate.get("/logout");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, signup, login, logout, initializeFirebaseAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}