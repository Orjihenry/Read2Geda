import { useEffect, useState } from "react";
import { bookData, type BookData } from "../utils/bookData";
import Swal from "sweetalert2";

export default function useBookData() {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
          setLoading(true);
          try {
            const response = await fetch("https://api.example.com/books");
            if (!response.ok) throw new Error("API Failed, using local books data");
      
            const data: BookData[] = await response.json();
            setBooks(data);
          } catch (err) {
            console.warn("Error fetching books from API:", err);
            setBooks(bookData);
            if (!error) {
                setError("Couldn't fetch books from API.");
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    timer: 3000,
                    icon: "error",
                    text: "Couldn't fetch books from API. Showing local data instead.",
                    showConfirmButton: false,
                });
            }
          } finally {
            setLoading(false);
          }
        }
        fetchBooks();
      }, []);

    return { books, loading, error };
}