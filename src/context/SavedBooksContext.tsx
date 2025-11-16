import { createContext, useContext, useCallback } from "react";
import { getCurrentDateTime } from "../utils/dateUtils";
import { useAuthContext } from "./AuthContext";
import { useBookCache } from "./BookCacheContext";
import type { User, UserBooks } from "../types/user";
import type { BookData, BookProgress } from "../utils/bookData";

type SavedBooksContextType = {
  isInShelf: (bookId: string) => boolean;
  addBook: (book: BookData) => void;
  removeBook: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
  getUserBookProgress: (bookId: string) => number;
  getReadingProgress: (userId: string) => BookProgress[];
  getBookClubProgress: (bookId: string) => number;
};

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(undefined);

export function SavedBooksProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, users, updateProfile } = useAuthContext();
  const { addBook: addBookToCache } = useBookCache();

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

    const userBooks: UserBooks = currentUser.books || {};

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [bookId]: removed, ...remainingBooks } = currentUser.books || {};

    const updatedUser: User = {
      ...currentUser,
      books: remainingBooks,
    };

    updateUser(updatedUser);
  }, [currentUser, updateUser]);

  const updateProgress = useCallback((bookId: string, progress: number) => {
    if (!currentUser) return;

    const userBooks: UserBooks = currentUser.books || {};
    const existing = userBooks[bookId];

    if (!existing) return;

    const currentDate = getCurrentDateTime();

    const updatedEntry = {
      ...existing,
      progress: Math.max(0, Math.min(progress, 100)),
      status: (progress >= 100 ? "completed" : "reading") as "reading" | "completed" | "to-read",
      startedAt: existing.startedAt || (progress > 0 ? currentDate : undefined),
      completedAt: progress >= 100 ? currentDate : existing.completedAt,
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

  const getReadingProgress = useCallback((userId: string): BookProgress[] => {
    const user = users.find((u) => u.id === userId);
    if (!user || !user.books) return [];

    const userBooks: UserBooks = user.books;
    return Object.entries(userBooks).map(([bookId, bookData]) => ({
      bookId,
      userId,
      progress: bookData.progress,
      status: bookData.status === "completed" 
        ? "completed" 
        : bookData.status === "reading" 
        ? "reading" 
        : "not_started",
      startedAt: bookData.startedAt,
      completedAt: bookData.completedAt,
      rating: bookData.rating,
    }));
  }, [users]);

  const getBookClubProgress = useCallback((bookId: string): number => {
    const allProgress = users
      .map((user) => {
        const userBooks: UserBooks = user.books || {};
        return userBooks[bookId]?.progress || 0;
      })
      .filter((progress) => progress > 0);

    if (allProgress.length === 0) return 0;

    const total = allProgress.reduce((sum, p) => sum + p, 0);
    return Math.round(total / allProgress.length);
  }, [users]);

  return (
    <SavedBooksContext.Provider
      value={{
        isInShelf,
        addBook,
        removeBook,
        updateProgress,
        getUserBookProgress,
        getReadingProgress,
        getBookClubProgress,
      }}
    >
      {children}
    </SavedBooksContext.Provider>
  );
}

export function useSavedBooks() {
  const context = useContext(SavedBooksContext);
  if (!context)
    throw new Error("useSavedBooks must be used within a SavedBooksProvider");
  return context;
}
