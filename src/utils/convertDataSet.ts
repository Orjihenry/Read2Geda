import { type BookData } from "./bookData";
import { getCurrentDateTime } from "./dateUtils";

export const convertDataSet = (book: any): BookData => {
    const currentDate = getCurrentDateTime();
    const bookKey = book.key?.replace(/^\/works\//, "") || book.key || `book-${currentDate}-${Math.random()}`;
    const authorName = book.authors?.[0]?.name || (typeof book.authors?.[0] === 'string' ? book.authors[0] : null) || "Unknown Author";
    const subjects = book.subject || book.subjects || [];
    const tags = Array.isArray(subjects) ? subjects.slice(0, 5).filter((s: any) => typeof s === 'string') : [];
    const description = typeof book.description === 'string' ? book.description : book.description?.value || (book.description?.type === '/type/text' ? book.description.value : null);
    const coverId = book.cover_id || book.cover_i;
    const coverImage = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "https://placehold.co/150x200?text=No+Preview+Image";
    
    return {
        id: bookKey,
        title: book.title || "Untitled",
        author: authorName,
        genre: tags[0] || "General",
        tags: tags.length > 0 ? tags : [],
        publishedYear: book.first_publish_year || book.publish_year?.[0] || 0,
        summary: description || "No description available.",
        coverImage: coverImage,
        rating: book.ratings_average || book.ratings?.average || 0,
    };
};
