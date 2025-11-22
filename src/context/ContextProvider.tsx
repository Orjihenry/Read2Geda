import { type ReactNode } from "react";
import { SavedBooksProvider } from "./SavedBooksContext";
import { ClubProvider } from "./ClubContext";
import AuthProvider from "./AuthContext";
import { BookCacheProvider } from "./BookCacheContext";
import { BookSearchModalProvider } from "./BookSearchModalContext";

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <AuthProvider>
      <BookCacheProvider>
        <SavedBooksProvider>
          <ClubProvider>
            <BookSearchModalProvider>
              {children}
            </BookSearchModalProvider>
          </ClubProvider>
        </SavedBooksProvider>
      </BookCacheProvider>
    </AuthProvider>
  );
}

export { SavedBooksProvider, ClubProvider, AuthProvider, BookCacheProvider, BookSearchModalProvider };
