import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const data = await authService.login(username, password);
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const isAdmin = () => hasRole('ROLE_ADMIN');
    const isTeacher = () => hasRole('ROLE_TEACHER');
    const isStudent = () => hasRole('ROLE_STUDENT');

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        hasRole,
        isAdmin,
        isTeacher,
        isStudent,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
