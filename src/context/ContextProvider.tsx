import { type ReactNode } from "react";
import { SavedBooksProvider } from "./SavedBooksContext";
import { ClubProvider } from "./ClubContext";

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <SavedBooksProvider>
      <ClubProvider>
        {children}
      </ClubProvider>
    </SavedBooksProvider>
  );
}

export { SavedBooksProvider, ClubProvider };
