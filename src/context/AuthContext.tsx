import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type AuthContextType = {
    currentUser: { user: string; email: string } | null;
    login: (email: string, pwd: string) => boolean;
    register: (user: string, email: string, pwd: string) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export default function AuthProvider({ children }: { children: React.ReactNode}) {
    
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<{user: string, email: string} | null>(null);
    
    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, [])
    
    const register = (user: string, email: string, pwd: string) => {
        const newUser = { user, email, pwd };
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.some((u: {email: string}) => u.email === email)) {
            Swal.fire({
                icon: "error",
                title: "Email already exists",
                text: "Please use a different email or login",
                confirmButtonText: "OK"
            })
            return false;
        }

        const newUsers = [...users, newUser]
        localStorage.setItem("users", JSON.stringify(newUsers));
        localStorage.setItem("currentUser", JSON.stringify({ user, email }));
        setCurrentUser({ user, email });
        navigate("/highlights");

        return true;
    };

    const login = (email: string, pwd: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const user = users.find(
            (u: {email: string, pwd: string} ) => u.email === email && u.pwd === pwd 
        );

        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Invalid credentials",
                text: "Please try again",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-outline-success",
                    popup: "rounded-3 shadow"
                },
            })
            return false;
        }

        setCurrentUser({ user: user.user, email: user.email });
        localStorage.setItem("currentUser", JSON.stringify({ user: user.user, email: user.email }));
        localStorage.setItem("isLoggedIn", "true");
        navigate("/highlights");

        return true;
    }

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within a AuthProvider");
    return context;
}

export function useAuthContextData() {
    const { currentUser, register, login, logout } = useAuthContext();
    return { currentUser, register, login, logout };
}