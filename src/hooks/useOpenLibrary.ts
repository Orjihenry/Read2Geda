import { useEffect, useState } from "react";

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

export default function useRandomBooks(subject: string = "fiction") {
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
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

        const shuffled = data.works.sort(() => 0.5 - Math.random());

        setBooks(shuffled.slice(0, 10));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomBooks();
  }, [subject]);

  return { books, loading, error };
}