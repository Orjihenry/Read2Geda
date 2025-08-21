import { useEffect, useState } from "react";
import { bookData, type BookData } from "../utils/bookData";
import Swal from "sweetalert2";

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
        Swal.fire({
          toast: true,
          position: "top-end",
          timer: 3000,
          icon: "success",
          text: "Book added successfully.",
          showConfirmButton: false,
        })
      } catch (err) {
        console.warn("Error adding book:", err);
        setError("Couldn't add book.");
        Swal.fire({
          toast: true,
          position: "top-end",
          timer: 3000,
          icon: "error",
          text: "Couldn't add book.",
          showConfirmButton: false,
        })
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
      Swal.fire({
        toast: true,
        position: "top-end",
        timer: 3000,
        icon: "success",
        text: "Book removed successfully.",
          showConfirmButton: false,
        })
      } catch (err) {
        console.warn("Error removing book:", err);
        setError("Couldn't remove book.");
        Swal.fire({
          toast: true,
          position: "top-end",
          timer: 3000,
          icon: "error",
          text: "Couldn't remove book.",
          showConfirmButton: false,
        })
      } finally {
        setLoading(false);
        setError(null);
      }
    }

    return { books, loading, error, addBook, removeBook };
}