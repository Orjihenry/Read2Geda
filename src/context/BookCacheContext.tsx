import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { BookData } from "../utils/bookData";
import { bookData as initialBookData } from "../utils/bookData";
import { convertDataSet } from "../utils/convertDataSet";

type BookCacheContextType = {
  books: Map<string, BookData>;
  getBook: (bookId: string) => BookData | undefined;
  getBooks: (bookIds?: string[]) => BookData[];
  addBook: (book: BookData | any) => Promise<void>;
  addBooks: (books: (BookData | any)[]) => Promise<BookData[]>;
  hasBook: (bookId: string) => boolean;
  loading: boolean;
  clearCache: () => Promise<void>;
};

const BookCacheContext = createContext<BookCacheContextType | undefined>(undefined);

export function BookCacheProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Map<string, BookData>>(new Map());
  const [loading, setLoading] = useState(true);

  const normalizeBook = useCallback(async (book: BookData | any): Promise<BookData> => {
    if (book.id && book.title && book.author && typeof book.publishedYear === "number") {
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

    return await convertDataSet(book);
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
    (async () => {
      try {
        const bookMap = new Map<string, BookData>();
        const stored = localStorage.getItem("bookCache");

        if (stored) {
          const parsed = JSON.parse(stored);
          const normalizedStored = await Promise.all(
            (Array.isArray(parsed) ? parsed : Object.values(parsed)).map((b: any) => normalizeBook(b))
          );
          normalizedStored.forEach((b) => bookMap.set(b.id, b));
        }

        const normalizedDefaults = await Promise.all(
          initialBookData.map((b) => normalizeBook(b))
        );
        normalizedDefaults.forEach((b) => {
          if (!bookMap.has(b.id)) bookMap.set(b.id, b);
        });

        setBooks(bookMap);
        saveToStorage(bookMap);
      } catch (err) {
        console.error("Error loading cache:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [normalizeBook, saveToStorage]);

  const getBook = useCallback((bookId: string) => {
    return books.get(bookId);
  }, [books]);

  const getBooks = useCallback((bookIds?: string[]): BookData[] => {
    if (!bookIds) return Array.from(books.values());
    return bookIds
      .map((id) => books.get(id))
      .filter((book): book is BookData => !!book);
  }, [books]);

  const hasBook = useCallback((bookId: string) => books.has(bookId), [books]);

  const addBook = useCallback(async (book: BookData | any) => {
    const normalized = await normalizeBook(book);
    
    setBooks((prev) => {
      const updated = new Map(prev);
      updated.set(normalized.id, normalized);
      saveToStorage(updated);
      return updated;
    });
  }, [normalizeBook, saveToStorage]);

  const addBooks = useCallback(async (booksToAdd: (BookData | any)[]) => {
    const normalizedBooks = await Promise.all(booksToAdd.map((b) => normalizeBook(b)));

    setBooks((prev) => {
      const updated = new Map(prev);
      normalizedBooks.forEach((book) => updated.set(book.id, book));
      saveToStorage(updated);
      return updated;
    });

    return normalizedBooks;
  }, [normalizeBook, saveToStorage]);

  const clearCache = useCallback(async () => {
    const freshMap = new Map<string, BookData>();
    const normalizedDefaults = await Promise.all(initialBookData.map((b) => normalizeBook(b)));

    normalizedDefaults.forEach((b) => freshMap.set(b.id, b));

    setBooks(freshMap);
    saveToStorage(freshMap);
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
