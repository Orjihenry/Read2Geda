import { type BookData } from "./bookData";
import { getCurrentDateTime } from "./dateUtils";
import { generateBriefDescription } from "./generateDescription";

export const convertDataSet = async (book: any): Promise<BookData> => {
    const currentDate = getCurrentDateTime();
    const bookKey = book.key?.replace(/^\/works\//, "") || book.key || `book-${currentDate}-${Math.random()}`;
    
    // Handle author - Open Library search.json returns author_name array, subjects/works returns authors array
    let authorName = "Unknown Author";
    if (book.author_name && Array.isArray(book.author_name) && book.author_name.length > 0) {
        authorName = book.author_name[0];
    } else if (book.authors && Array.isArray(book.authors) && book.authors.length > 0) {
        authorName = book.authors[0]?.name || (typeof book.authors[0] === 'string' ? book.authors[0] : null) || "Unknown Author";
    } else if (book.author_name && typeof book.author_name === 'string') {
        authorName = book.author_name;
    }
    
    const subjects = book.subject || book.subjects || [];
    const tags = Array.isArray(subjects) ? subjects.slice(0, 5).filter((s: any) => typeof s === 'string') : [];
    const title = book.title || "Untitled";
    const publishedYear = book.first_publish_year || book.publish_year?.[0];
    const description = await generateBriefDescription(title, authorName, publishedYear);
    
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
        rating: 0,
    };
};
