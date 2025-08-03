import { useEffect, useState } from "react";
import { bookData, type BookData } from "../utils/bookData";

export default function useBookData() {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setBooks(bookData);
            setLoading(false);
        }, 500);
    }, []);

    return { books, loading };
}