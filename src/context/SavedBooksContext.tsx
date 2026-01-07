import { createContext, useContext, useCallback } from "react";
import { getCurrentDateTime } from "../utils/dateUtils";
import { useAuthContext } from "./AuthContext";
import { useBookCache } from "./BookCacheContext";
import type { User, UserBooks } from "../types/user";
import type { BookData } from "../utils/bookData";

type SavedBooksContextType = {
  isInShelf: (bookId: string) => boolean;
  addBook: (book: BookData) => void;
  removeBook: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
  getUserBookProgress: (bookId: string) => number;
  getUserBookStartedAt: (bookId: string) => string | undefined;
  getUserBookCompletedAt: (bookId: string) => string | undefined;
  getCompletedBooks: (limit?: number) => BookData[];
  getToReadBooks: (limit?: number) => BookData[];
  loading: boolean;
};

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(undefined);

export function SavedBooksProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, users, updateProfile } = useAuthContext();
  const { addBook: addBookToCache, getBooks, loading } = useBookCache();

  // Helpers
  const updateUser = useCallback((updatedUser: User) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateProfile(updatedUser);
  }, [users, updateProfile]);

  const isInShelf = useCallback((bookId: string) => {
    if (!currentUser) return false;
    const userBooks: UserBooks = currentUser.books || {};
    return !!userBooks[bookId];
  }, [currentUser]);

  const addBook = useCallback((book: BookData) => {
    if (!currentUser) return;

    addBookToCache(book);

    const userBooks: UserBooks = currentUser.books ? { ...currentUser.books } : {};

    if (userBooks[book.id]) return;

    const currentDate = getCurrentDateTime();
    const updatedUser: User = {
      ...currentUser,
      books: {
        ...userBooks,
        [book.id]: {
          status: "to-read",
          progress: 0,
          addedAt: currentDate,
        },
      },
    };

    updateUser(updatedUser);
  }, [currentUser, updateUser, addBookToCache]);

  const removeBook = useCallback((bookId: string) => {
    if (!currentUser) return;

    const userBooks: UserBooks = currentUser.books ? { ...currentUser.books } : {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [bookId]: removed, ...remainingBooks } = userBooks;

    const updatedUser: User = {
      ...currentUser,
      books: remainingBooks,
    };

    updateUser(updatedUser);
  }, [currentUser, updateUser]);

  const updateProgress = useCallback((bookId: string, progress: number) => {
    if (!currentUser) return;

    const userBooks: UserBooks = currentUser.books ? { ...currentUser.books } : {};
    const existing = userBooks[bookId];

    if (!existing) return;

    const currentDate = getCurrentDateTime();
    const newProgress = Math.max(0, Math.min(progress, 100));

    const updatedEntry = {
      ...existing,
      progress: newProgress,
      status: (newProgress >= 100 ? "completed" : newProgress > 0 ? "reading" : "to-read") as "reading" | "completed" | "to-read",
      startedAt: newProgress === 0 ? undefined : (existing.startedAt || (newProgress > 0 ? currentDate : undefined)),
      completedAt: newProgress >= 100 ? currentDate : undefined,
    };

    const updatedUser: User = {
      ...currentUser,
      books: {
        ...userBooks,
        [bookId]: updatedEntry,
      },
    };

    updateUser(updatedUser);
  }, [currentUser, updateUser]);

  const getUserBookProgress = useCallback((bookId: string): number => {
    if (!currentUser) return 0;

    const userBooks: UserBooks = currentUser.books || {};
    return userBooks[bookId]?.progress || 0;
  }, [currentUser]);

  const getUserBookStartedAt = useCallback((bookId: string): string | undefined => {
    if (!currentUser) return undefined;
    const userBooks: UserBooks = currentUser.books || {};
    return userBooks[bookId]?.startedAt;
  }, [currentUser]);

  const getUserBookCompletedAt = useCallback((bookId: string): string | undefined => {
    if (!currentUser) return undefined;
    const userBooks: UserBooks = currentUser.books || {};
    return userBooks[bookId]?.completedAt;
  }, [currentUser]);

  const getCompletedBooks = useCallback((limit?: number): BookData[] => {
    if (!currentUser?.books) return [];
    
    const userBooks = currentUser.books;
    const completedIds = Object.keys(userBooks).filter(
      (bookId) => userBooks[bookId].status === "completed"
    );
    
    const books = getBooks(completedIds);
    
    const sortedBooks = books.sort((a, b) => {
      const aData = userBooks[a.id];
      const bData = userBooks[b.id];
      const aDate = aData.completedAt || aData.addedAt || "";
      const bDate = bData.completedAt || bData.addedAt || "";
      return bDate.localeCompare(aDate);
    });
    
    return limit ? sortedBooks.slice(0, limit) : sortedBooks;
  }, [currentUser, getBooks]);

  const getToReadBooks = useCallback((limit?: number): BookData[] => {
    if (!currentUser?.books) return [];
    
    const userBooks = currentUser.books;
    const toReadIds = Object.keys(userBooks).filter(
      (bookId) => userBooks[bookId].status !== "completed"
    );
    
    const books = getBooks(toReadIds);
    
    const sortedBooks = books.sort((a, b) => {
      const aData = userBooks[a.id];
      const bData = userBooks[b.id];
      const aDate = aData.addedAt || "";
      const bDate = bData.addedAt || "";
      return bDate.localeCompare(aDate);
    });
    
    return limit ? sortedBooks.slice(0, limit) : sortedBooks;
  }, [currentUser, getBooks]);

  return (
    <SavedBooksContext.Provider
      value={{
        isInShelf,
        addBook,
        removeBook,
        updateProgress,
        getUserBookProgress,
        getUserBookStartedAt,
        getUserBookCompletedAt,
        getCompletedBooks,
        getToReadBooks,
        loading,
      }}
    >
      {children}
    </SavedBooksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSavedBooks() {
  const context = useContext(SavedBooksContext);
  if (!context)
    throw new Error("useSavedBooks must be used within a SavedBooksProvider");
  return context;
}
