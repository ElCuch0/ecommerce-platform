import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.js";

export default function ProtectedRoute({
  children,
  allowedRoles
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
