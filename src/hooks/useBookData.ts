import { useEffect, useState } from "react";
import { bookData, type BookData } from "../utils/bookData";
import { notifyAlert } from "../alerts/sweetAlert";

export default function useBookData() {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const addBook = (book: BookData) => {
      try {
        const newBooks = [...books, book];
        setBooks(newBooks);
        localStorage.setItem("bookData", JSON.stringify(newBooks));
        notifyAlert({
          title: "Book added successfully.",
          icon: "success",
          options: {
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          },
        });
      } catch (err) {
        console.warn("Error adding book:", err);
        setError("Couldn't add book.");
        notifyAlert({
          title: "Couldn't add book.",
          icon: "error",
          confirmVariant: "danger",
          options: {
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          },
        });
      } finally {
        setLoading(false);
        setError(null);
      }
    }

    const removeBook = (book: BookData) => {
      try {
        const newBooks = books.filter(b => b.author !== book.author);
        setBooks(newBooks);
        localStorage.setItem("bookData", JSON.stringify(newBooks));
      notifyAlert({
        title: "Book removed successfully.",
        icon: "success",
        options: {
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        },
      });
      } catch (err) {
        console.warn("Error removing book:", err);
        setError("Couldn't remove book.");
        notifyAlert({
          title: "Couldn't remove book.",
          icon: "error",
          confirmVariant: "danger",
          options: {
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          },
        });
      } finally {
        setLoading(false);
        setError(null);
      }
    }

    return { books, loading, error, addBook, removeBook };
}