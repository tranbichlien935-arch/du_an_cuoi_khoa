import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If requiredRole is specified, check if user has that role
    if (requiredRole) {
        if (Array.isArray(requiredRole)) {
            // Check if user has any of the required roles
            if (!requiredRole.includes(user?.role)) {
                // Redirect to appropriate dashboard based on user's role
                if (user?.role === 'ROLE_ADMIN') {
                    return <Navigate to="/admin/dashboard" replace />;
                } else if (user?.role === 'ROLE_TEACHER') {
                    return <Navigate to="/teacher/dashboard" replace />;
                } else if (user?.role === 'ROLE_STUDENT') {
                    return <Navigate to="/student/courses" replace />;
                }
                return <Navigate to="/" replace />;
            }
        } else {
            // Check if user has the specific role
            if (user?.role !== requiredRole) {
                // Redirect to appropriate dashboard
                if (user?.role === 'ROLE_ADMIN') {
                    return <Navigate to="/admin/dashboard" replace />;
                } else if (user?.role === 'ROLE_TEACHER') {
                    return <Navigate to="/teacher/dashboard" replace />;
                } else if (user?.role === 'ROLE_STUDENT') {
                    return <Navigate to="/student/courses" replace />;
                }
                return <Navigate to="/" replace />;
            }
        }
    }

    return children;
};

export default ProtectedRoute;
