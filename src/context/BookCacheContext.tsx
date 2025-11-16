import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { BookData } from "../utils/bookData";
import { bookData as initialBookData } from "../utils/bookData";
import { convertDataSet } from "../utils/convertDataSet";

type BookCacheContextType = {
  books: Map<string, BookData>;
  getBook: (bookId: string) => BookData | undefined;
  getBooks: (bookIds?: string[]) => BookData[];
  addBook: (book: BookData | any) => void;
  addBooks: (books: (BookData | any)[]) => BookData[];
  hasBook: (bookId: string) => boolean;
  loading: boolean;
  clearCache: () => void;
};

const BookCacheContext = createContext<BookCacheContextType | undefined>(undefined);

export function BookCacheProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Map<string, BookData>>(new Map());
  const [loading, setLoading] = useState(true);

  const booksRef = useRef<Map<string, BookData>>(new Map());

  const normalizeBook = useCallback((book: BookData | any): BookData => {
    if (book.id && book.title && book.author && typeof book.publishedYear === 'number') {
      return {
        id: book.id,
        title: book.title || "Untitled",
        author: book.author || "Unknown Author",
        genre: book.genre || "General",
        publishedYear: book.publishedYear || 0,
        summary: book.summary || "No description available.",
        coverImage: book.coverImage || "https://placehold.co/150x200?text=No+Preview+Image",
        tags: Array.isArray(book.tags) ? book.tags : [],
        rating: book.rating ?? 0,
      };
    }

    return convertDataSet(book);
  }, []);

  const saveToStorage = useCallback((bookMap: Map<string, BookData>) => {
    try {
      const booksArray = Array.from(bookMap.values());
      localStorage.setItem("bookCache", JSON.stringify(booksArray));
    } catch (error) {
      console.error("Error saving book cache:", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("bookCache");
      const bookMap = new Map<string, BookData>();

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach((book: BookData) => {
            const normalized = normalizeBook(book);
            bookMap.set(normalized.id, normalized);
          });
        } else if (typeof parsed === 'object') {
          Object.values(parsed).forEach((book: any) => {
            const normalized = normalizeBook(book);
            bookMap.set(normalized.id, normalized);
          });
        }
      }

      initialBookData.forEach((book) => {
        const normalized = normalizeBook(book);
        if (!bookMap.has(normalized.id)) {
          bookMap.set(normalized.id, normalized);
        }
      });

      booksRef.current = bookMap;
      setBooks(bookMap);
      saveToStorage(bookMap);
    } catch (error) {
      console.error("Error loading book cache:", error);
      const bookMap = new Map<string, BookData>();
      initialBookData.forEach((book) => {
        const normalized = normalizeBook(book);
        bookMap.set(normalized.id, normalized);
      });
      booksRef.current = bookMap;
      setBooks(bookMap);
      saveToStorage(bookMap);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    booksRef.current = books;
  }, [books]);

  const getBook = useCallback((bookId: string): BookData | undefined => {
    return booksRef.current.get(bookId);
  }, []);

  const getBooks = useCallback((bookIds?: string[]): BookData[] => {
    const currentBooks = booksRef.current;
    if (!bookIds) {
      return Array.from(currentBooks.values());
    }
    return bookIds
      .map((id) => currentBooks.get(id))
      .filter((book): book is BookData => book !== undefined);
  }, []);

  const hasBook = useCallback((bookId: string): boolean => {
    return booksRef.current.has(bookId);
  }, []);

  const addBook = useCallback((book: BookData | any) => {
    const normalized = normalizeBook(book);
    setBooks((prev) => {
      const updated = new Map(prev);
      updated.set(normalized.id, normalized);
      booksRef.current = updated;
      saveToStorage(updated);
      return updated;
    });
  }, [normalizeBook, saveToStorage]);

  const addBooks = useCallback((booksToAdd: (BookData | any)[]): BookData[] => {
    const normalizedBooks: BookData[] = [];
    const updated = new Map(booksRef.current);
    
    booksToAdd.forEach((book) => {
      const normalized = normalizeBook(book);
      normalizedBooks.push(normalized);
      updated.set(normalized.id, normalized);
    });
    
    booksRef.current = updated;
    setBooks(updated);
    saveToStorage(updated);
    
    return normalizedBooks;
  }, [normalizeBook, saveToStorage]);

  const clearCache = useCallback(() => {
    const bookMap = new Map<string, BookData>();
    initialBookData.forEach((book) => {
      const normalized = normalizeBook(book);
      bookMap.set(normalized.id, normalized);
    });
    booksRef.current = bookMap;
    setBooks(bookMap);
    saveToStorage(bookMap);
  }, [normalizeBook, saveToStorage]);

  const value = useMemo(() => ({
    books,
    getBook,
    getBooks,
    addBook,
    addBooks,
    hasBook,
    loading,
    clearCache,
  }), [books, getBook, getBooks, addBook, addBooks, hasBook, loading, clearCache]);

  return (
    <BookCacheContext.Provider value={value}>
      {children}
    </BookCacheContext.Provider>
  );
}

export function useBookCache() {
  const context = useContext(BookCacheContext);
  if (!context) {
    throw new Error("useBookCache must be used within a BookCacheProvider");
  }
  return context;
}
