import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export function PrivateRoute() {
  const { user } = useAuth();

  return !!user ? <Outlet /> : <Navigate to="/signin" />;
}
