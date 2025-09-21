import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuthContext();

  if (!auth) throw new Error("ProtectedRoute must be used inside AuthProvider");

  const { currentUser } = auth;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}