import { createContext, useContext, useState, useEffect } from "react";
import { bookData, type BookData } from "../utils/bookData";

type SavedBooksContextType = {
  books: BookData[];
  loading: boolean;
  addBook: (book: BookData) => void;
  removeBook: (id: string) => void;
  isInShelf: (id: string) => boolean;
};

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(undefined);

export function SavedBooksProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <SavedBooksContext.Provider value={{ books, loading, addBook, removeBook, isInShelf }}>
      {children}
    </SavedBooksContext.Provider>
  );
}

export function useSavedBooks() {
  const context = useContext(SavedBooksContext);
  if (!context) throw new Error("useSavedBooks must be used within a SavedBooksProvider");
  return context;
}