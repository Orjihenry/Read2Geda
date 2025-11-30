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
        const stored = localStorage.getItem("bookCache");
        const bookMap = new Map<string, BookData>();

        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const normalizedPromises = parsed.map((book: BookData) => normalizeBook(book));
            const normalized = await Promise.all(normalizedPromises);
            normalized.forEach((book) => {
              bookMap.set(book.id, book);
            });
          } else if (typeof parsed === 'object') {
            const booksArray = Object.values(parsed);
            const normalizedPromises = booksArray.map((book: any) => normalizeBook(book));
            const normalized = await Promise.all(normalizedPromises);
            normalized.forEach((book) => {
              bookMap.set(book.id, book);
            });
          }
        }

        const initialPromises = initialBookData.map((book) => normalizeBook(book));
        const initialNormalized = await Promise.all(initialPromises);
        initialNormalized.forEach((book) => {
          if (!bookMap.has(book.id)) {
            bookMap.set(book.id, book);
          }
        });

        setBooks(bookMap);
        saveToStorage(bookMap);
      } catch (error) {
        console.error("Error loading book cache:", error);
        const bookMap = new Map<string, BookData>();
        const initialPromises = initialBookData.map((book) => normalizeBook(book));
        const initialNormalized = await Promise.all(initialPromises);
        initialNormalized.forEach((book) => {
          bookMap.set(book.id, book);
        });
        setBooks(bookMap);
        saveToStorage(bookMap);
      } finally {
        setLoading(false);
      }
    })();
  }, [normalizeBook, saveToStorage]);

  const getBook = useCallback((bookId: string): BookData | undefined => {
    return books?.get(bookId);
  }, [books]);

  const getBooks = useCallback((bookIds?: string[]): BookData[] => {
    const currentBooks = books;
    if (!bookIds) {
      return Array.from(currentBooks.values());
    }
    return bookIds
      .map((id) => currentBooks.get(id))
      .filter((book): book is BookData => book !== undefined);
  }, [books]);

  const hasBook = useCallback((bookId: string): boolean => {
    return books.has(bookId);
  }, [books]);

  const addBook = useCallback(async (book: BookData | any) => {
    const normalized = await normalizeBook(book);
    setBooks((prev) => {
      const updated = new Map(prev);
      updated.set(normalized.id, normalized);
      setBooks(updated);
      saveToStorage(updated);
      return updated;
    });
  }, [normalizeBook, saveToStorage]);

  const addBooks = useCallback(async (booksToAdd: (BookData | any)[]): Promise<BookData[]> => {
    const normalizedPromises = booksToAdd.map((book) => normalizeBook(book));
    const normalizedBooks = await Promise.all(normalizedPromises);
    const updated = new Map(books);
    
    normalizedBooks.forEach((book) => {
      updated.set(book.id, book);
    });

    setBooks(updated);
    saveToStorage(updated);
    
    return normalizedBooks;
  }, [normalizeBook, saveToStorage]);

  const clearCache = useCallback(async () => {
    const bookMap = new Map<string, BookData>();
    const normalizedPromises = initialBookData.map((book) => normalizeBook(book));
    const normalized = await Promise.all(normalizedPromises);
    normalized.forEach((book) => {
      bookMap.set(book.id, book);
    });
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
