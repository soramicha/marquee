// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { axiosPrivate } from '@/api/axios';

// ADDED: Create the AuthContext to store global authentication state.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // UPDATED: Expand auth state to include both the access token and user details.
  const [auth, setAuth] = useState({ access_token: null, user: null });

  const signup = async (username, password) => {
    try {
      const response = await axiosPrivate.post("/signup", {
        username,
        password
      });
      // UPDATED: Save both the access token and user details.
      // Ensure your backend returns userID and username.
      setAuth({
        access_token: response.data.access_token,
        user: {
          id: response.data.userID,         // ADDED: User ID from server response.
          username: response.data.username,   // ADDED: Username from server response.
          // Add additional fields if provided (e.g., name, email, bio).
        }
      });
    } catch (error) {
      throw error;
    }
  };

  // TODO: Redirect user on successful login to home/feed page.
  const login = async (username, password) => {
    try {
      const response = await axiosPrivate.post("/login", {
        username,
        password
      });
      // UPDATED: Save both token and user details from login response.
      setAuth({
        access_token: response.data.access_token,
        user: {
          id: response.data.userID,         // ADDED: User ID from server response.
          username: response.data.username,   // ADDED: Username from server response.
          // Add additional fields if provided.
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (username) => {
    // Clear the auth state on logout.
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

// Custom hook to use the AuthContext.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
