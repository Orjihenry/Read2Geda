import { useEffect, useState } from "react";
import type { BookData } from "../utils/bookData";
import { convertDataSet } from "../utils/convertDataSet";
import Swal from "sweetalert2";

export default function useRandomBooks(subject: string = "fiction") {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRandomBooks() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=50`
        );
        if (!response.ok) throw new Error("Failed to fetch from Open Library");

        const data = await response.json();

        const books = data.works.map(convertDataSet);

        const shuffled = books.sort(() => 0.5 - Math.random());

        setBooks(shuffled.slice(0, 10));
      } catch (err: any) {
        setError(err.message);
        Swal.fire({
            toast: true,
            position: "top-end",
            timer: 4000,
            icon: "error",
            text: "Couldn't fetch books from API.",
            showConfirmButton: false,
        })
      } finally {
        setLoading(false);
      }
    }

    fetchRandomBooks();
  }, [subject]);

  return { books, loading, error };
}