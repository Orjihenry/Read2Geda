import { useEffect, useState, useRef } from "react";
import type { BookData } from "../utils/bookData";
import { useBookCache } from "../context/BookCacheContext";
import { notifyAlert } from "../alerts/sweetAlert";

export default function useRandomBooks(subject: string = "fiction") {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addBooks } = useBookCache();
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;
    
    async function fetchRandomBooks() {
      fetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=50`
        );
        if (!response.ok) throw new Error("Failed to fetch from Open Library");

        const data = await response.json();

        const fetchedBooks = data.works || [];

        const normalizedBooks = await addBooks(fetchedBooks);

        const shuffled = [...normalizedBooks].sort(() => 0.5 - Math.random());
        setBooks(shuffled.slice(0, 10));
      } catch (err: any) {
        setError(err.message);
        notifyAlert({
          title: "Couldn't fetch books from API.",
          icon: "error",
          confirmVariant: "danger",
          options: {
            toast: true,
            position: "top-end",
            timer: 4000,
            showConfirmButton: false,
          },
        });
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    }

    fetchRandomBooks();
    
    return () => {
      fetchingRef.current = false;
    };
  }, [subject, addBooks]);

  return { books, loading, error };
}