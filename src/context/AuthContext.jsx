import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // We start assuming the user is not logged in.
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login.php', { email, password });
            if (response.data.employee) {
                setUser(response.data.employee);
                navigate('/'); // Navigate to dashboard on successful login
            }
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            // This robust error handling prevents crashes
            if (error.response && error.response.data) {
                // An error the backend sent (e.g., "Invalid credentials")
                throw error.response.data;
            } else {
                // A network error (CORS, wrong URL, server down)
                throw new Error('Network Error: Could not connect to the API server.');
            }
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout.php');
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
            navigate('/login'); // Navigate to login page after logout
        }
    };

    const value = { user, login, logout, isAuthenticated: !!user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// This is a custom hook to easily access the context
export const useAuth = () => {
    return useContext(AuthContext);
};