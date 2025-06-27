/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  let token;
      if (role==="student") {
        token = localStorage.getItem("studentToken");
      }else if(role==="teacher"){
        token = localStorage.getItem("teacherToken");
      }else{
        token = localStorage.getItem("adminToken");
      }

  // Not logged in at all
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // If a role is required and doesn't match
    if (role && userRole !== role) {
      return <Navigate to="/login" replace />;
    }

    // Everything okay, return the page
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
