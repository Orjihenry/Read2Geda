import  { type BookData } from "./bookData";

export const convertDataSet = (book: any): BookData => {
    return {
        id: book.key,
        title: book.title,
        author: book.authors?.[0]?.name,
        genre: book.subject?.[0],
        tags: Array.isArray(book.subject) ? book.subject?.slice(0, 2) : [0],
        publishedYear: book.first_publish_year,
        summary: book.description?.value || book.description,
        coverImage: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://placehold.co/150x200?text=No+Preview+Image"
    }
}