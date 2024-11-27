import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isMfaVerified } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user && !isMfaVerified) {
    return <Navigate to="/mfa-required" replace />;
  }

  return children;
};

export default ProtectedRoute;
