import { useState, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import { type BookData } from "../utils/bookData";
import { convertDataSet } from "../utils/convertDataSet";

export default function useSearchBooks() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const quotedQuery = `"${query.trim()}"`;
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(quotedQuery)}&limit=20&fields=key,title,author_name,author_key,first_publish_year,cover_i,subject,ratings_average`,
        { signal: abortRef.current.signal }
      );
      
      if (!response.ok) throw new Error("Failed to fetch API");

      const data = await response.json();
      const formatted: BookData[] = await Promise.all(data.docs.map(convertDataSet));
      setBooks(formatted);
    } catch (err: unknown) {
      if ((err as any)?.name === "AbortError") return;
      
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
  }, []);

  return { books, loading, error, search };
}