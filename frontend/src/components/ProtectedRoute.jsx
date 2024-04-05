import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //   const { isLoggedIn } = useSelector((state) => state.auth);
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") || null;
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
