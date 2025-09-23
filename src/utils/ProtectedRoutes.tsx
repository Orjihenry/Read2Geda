import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuthContext();

  if (!auth) throw new Error("ProtectedRoute must be used inside AuthProvider");

  const { currentUser, isLoading } = auth;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <span className="visually-hidden">Loading...</span>
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}