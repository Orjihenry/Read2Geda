import { useState, useEffect } from "react";
import { bookData, type BookData } from "../utils/bookData";

export default function useSavedBooks() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBooks = localStorage.getItem("bookData");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(bookData);
      localStorage.setItem("bookData", JSON.stringify(bookData));
    }
    setLoading(false);
  }, []);

  const addBook = (newBook: BookData) => {
    if (!books.find((b) => b.id === newBook.id)) {
      const updated = [...books, newBook];
      setBooks(updated);
      localStorage.setItem("bookData", JSON.stringify(updated));
    }
  };

  const removeBook = (bookId: string) => {
    const updated = books.filter((b) => b.id !== bookId);
    setBooks(updated);
    localStorage.setItem("bookData", JSON.stringify(updated));
  };

  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem("bookData", JSON.stringify(books));
    }
  }, [books]);

  const isInShelf = (bookId: string) => {
    return books.some((b) => b.id === bookId);
  };

  return { books, loading, addBook, removeBook, isInShelf };
}