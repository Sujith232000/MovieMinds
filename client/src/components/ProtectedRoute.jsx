import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Replace with a more secure check

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;