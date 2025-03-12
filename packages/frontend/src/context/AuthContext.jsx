import { createContext, useContext, useState } from 'react';
import { axiosPrivate } from '@/api/axios';
import { authenticateWithFirebase } from '@/utils/firebase-auth';
import { auth as firebaseAuth } from "@/config/firebase-config";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ access_token: null, firebaseUID: null, username: null });
    const navigate = useNavigate();

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
                username,
                access_token: response.data.access_token
            }));
            localStorage.setItem("authToken", response.data.access_token);
            localStorage.setItem("username", username);
            await initializeFirebaseAuth(response.data.access_token);
            navigate('/home')
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
                username,
                access_token: response.data.access_token
            }));

            localStorage.setItem("authToken", response.data.access_token);
            localStorage.setItem("username", username);
            await initializeFirebaseAuth(response.data.access_token);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setAuth(prev => ({
          ...prev,
          username: null,
          access_token: null,
          firebaseUID: null
        }));        
        try {
            await axiosPrivate.get("/logout");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
