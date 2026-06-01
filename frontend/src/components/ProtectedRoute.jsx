/**
 * ProtectedRoute.jsx — Route guard that shows children when authenticated, otherwise redirects to login.
 */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
