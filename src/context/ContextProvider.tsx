import { type ReactNode } from "react";
import { SavedBooksProvider } from "./SavedBooksContext";
import { ClubProvider } from "./ClubContext";
import AuthProvider from "./AuthContext";

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <AuthProvider>
      <SavedBooksProvider>
        <ClubProvider>
          {children}
        </ClubProvider>
      </SavedBooksProvider>
    </AuthProvider>
  );
}

export { SavedBooksProvider, ClubProvider, AuthProvider };
