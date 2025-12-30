import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "../types/user.ts";
import { UsersData } from "../utils/userData.ts";
import { getCurrentDateTime } from "../utils/dateUtils.ts";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

type AuthContextType = {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, pwd: string) => boolean;
  register: (name: string, email: string, pwd: string) => boolean;
  updateProfile: (user: User) => boolean;
  logout: () => void;
  getUserById: (userId: string) => User | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUsers = useCallback(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify(UsersData));
    }
    setUsers(users);

    const userId = localStorage.getItem("currentUser");
    const user = users.find((u: User) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const register = useCallback((name: string, email: string, pwd: string) => {
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      pwd,
      joinedAt: getCurrentDateTime(),
      isActive: true,
      books: {},
    };

    if (users.some((u: { email: string }) => u.email === email)) {
      Swal.fire({
        icon: "error",
        title: "Email already exists",
        text: "Please use a different email or login",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-success",
          popup: "rounded-3 shadow",
        },
      });
      return false;
    }

    const newUsers = [...(users ?? []), newUser];
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
    localStorage.setItem("currentUser", newUser.id);
    setCurrentUser(newUser);
    setIsLoggedIn(true);

    return true;
  }, [users]);

  const login = useCallback((email: string, pwd: string) => {
    const user = users.find(
      (u: { email: string; pwd: string }) => u.email === email && u.pwd === pwd
    );

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        text: "Please try again",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-success",
          popup: "rounded-3 shadow",
        },
      });
      return false;
    }

    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", user.id);

    return true;
  }, [users]);

  const updateProfile = useCallback((user: User) => {
    if (currentUser) {
      const save = (updated: User[]) => {
        setUsers(updated);
        localStorage.setItem("users", JSON.stringify(updated));
      };

      const updatedUsers = users.map((u) =>
        u.id === currentUser?.id ? user : u
      );
      save(updatedUsers);
      setCurrentUser(user);
      localStorage.setItem("currentUser", user.id);

      return true;
    }
    return false;
  }, [currentUser, users]);

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  const getUserById = useCallback((userId: string): User | undefined => {
    return users.find((u) => u.id === userId);
  }, [users]);

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isLoading,
        isLoggedIn,
        register,
        updateProfile,
        login,
        logout,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
}
