import { useState, useEffect } from "react";
import { bookData, type BookData } from "../utils/bookData";

export default function useSavedBooks() {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);

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

    return { books, loading };
}