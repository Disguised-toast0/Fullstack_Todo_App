import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import Cookies from "js-cookie";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((s) => s.user);
  const token = Cookies.get("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
