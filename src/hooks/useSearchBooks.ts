import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { type BookData } from "../utils/bookData";
import { convertDataSet } from "../utils/convertDataSet";

export default function useSearchBooks(query: string, trigger: boolean) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trigger || !query) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        if (!response.ok) throw new Error("Failed to fetch API");

        const data = await response.json();

        const books = data.docs.map(convertDataSet)

        const formatted: BookData[] = books;

        setBooks(formatted);
      } catch (err) {
        console.warn("Error fetching books from API:", err);
        setError("Couldn't fetch books from API.");

        Swal.fire({
          toast: true,
          position: "top-end",
          timer: 3000,
          icon: "error",
          text: "Failed to fetch books from API.",
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, trigger]);

  return { books, loading, error };
}