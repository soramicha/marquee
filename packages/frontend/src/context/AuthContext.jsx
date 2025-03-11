// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { axiosPrivate } from "@/api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ username: null, access_token: null });

  const signup = async (username, password) => {
    try {
      const response = await axiosPrivate.post("/signup", { username, password });
      setAuth({
        username,
        access_token: response.data.access_token,
      });
    } catch (error) {
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axiosPrivate.post("/login", { username, password });
      setAuth({
        username,
        access_token: response.data.access_token,
      });

      // Temporary solution: store token and username in localStorage
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("username", username);
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATED LOGOUT:
  const logout = async () => {
    try {
      // If we have a username, send it to the server's /logout endpoint
      if (auth?.username) {
        await axiosPrivate.post("/logout", { username: auth.username });
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Remove items from localStorage and reset auth state
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      setAuth({ username: null, access_token: null });
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
