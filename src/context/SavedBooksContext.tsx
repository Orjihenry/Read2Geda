import { createContext, useContext, useState, useEffect } from "react";
import { bookData, type BookData, type BookProgress } from "../utils/bookData";

type SavedBooksContextType = {
  books: BookData[];
  loading: boolean;
  addBook: (book: BookData) => void;
  removeBook: (id: string) => void;
  isInShelf: (id: string) => boolean;
  getReadingProgress: (userId: string) => BookProgress[];
  getBookClubProgress: (bookId: string) => number;
  updateProgress: (userId: string, bookId: string, progress: number) => void;
  getUserBookProgress: (userId: string, bookId: string) => number;
};

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(
  undefined
);

export function SavedBooksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const stored = localStorage.getItem("bookData");
    if (stored) setBooks(JSON.parse(stored));
    else {
      setBooks(bookData);
      localStorage.setItem("bookData", JSON.stringify(bookData));
    }
    setLoading(false);
  }, []);

  const save = (updated: BookData[]) => {
    setBooks(updated);
    localStorage.setItem("bookData", JSON.stringify(updated));
  };

  const addBook = (book: BookData) => {
    if (!books.find((b) => b.id === book.id)) {
      save([...books, book]);
    }
  };

  const removeBook = (id: string) => {
    save(books.filter((b) => b.id !== id));
  };

  const isInShelf = (id: string) => books.some((b) => b.id === id);

  const getReadingProgress = (userId: string) => {
    return books.flatMap(
      (book) =>
        book.readingProgress?.filter(
          (progress) => progress.userId === userId
        ) || []
    );
  };

  const getBookClubProgress = (bookId: string): number => {
    const book = books.find((b) => b.id === bookId);
    if (!book?.readingProgress?.length) return 0;

    const total = book.readingProgress.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(total / book.readingProgress.length);
  };

  const updateProgress = (userId: string, bookId: string, progress: number) => {
    const updatedBooks = books.map((book) => {
      if (book.id !== bookId) return book;

      const userProgress = book.readingProgress || [];
      const userEntry = userProgress.find((p) => p.userId === userId);

      let newProgress: BookProgress;
      if (userEntry) {
        newProgress = {
          ...userEntry,
          progress,
          status: progress >= 100 ? "completed" : "reading",
        };
        return {
          ...book,
          readingProgress: userProgress.map((p) =>
            p.userId === userId ? newProgress : p
          ),
        };
      } else {
        newProgress = {
          bookId,
          userId,
          progress,
          status: "reading",
          startedAt: new Date().toISOString(),
        };
        return { ...book, readingProgress: [...userProgress, newProgress] };
      }
    });
    save(updatedBooks);
  };

  const getUserBookProgress = (userId: string, bookId: string): number => {
    const book = books.find((b) => b.id === bookId);
    return (
      book?.readingProgress?.find((p) => p.userId === userId)?.progress || 0
    );
  };

  return (
    <SavedBooksContext.Provider
      value={{
        books,
        loading,
        addBook,
        removeBook,
        isInShelf,
        getReadingProgress,
        getBookClubProgress,
        updateProgress,
        getUserBookProgress,
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
