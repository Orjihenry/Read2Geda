import { useState, useEffect } from "react";
import { bookData, type BookData } from "../utils/bookData";
import Swal from "sweetalert2";


export default function useOpenLibrary() {
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
    }, [])
    
    const fetchBooks = async (query: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
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
                })
            }
        } finally {
            setLoading(false);
        }
    }

    const searchBooks = (query: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
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
                })
            }
        } finally {
            setLoading(false);
        }
    }

    return { books, loading, error, searchBooks, fetchBooks };
}