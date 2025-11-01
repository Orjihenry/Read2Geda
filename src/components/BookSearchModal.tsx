import { useState, useCallback } from "react";
import Modal from "./Modal";
import BookCard from "./BookCard";
import useSearchBooks from "../hooks/useSearchBooks";
import useRandomBooks from "../hooks/useOpenLibrary";

type BookSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookSearchModal({ isOpen, onClose }: BookSearchModalProps) {
  const [query, setQuery] = useState("");
  const { books: randomBooks } = useRandomBooks();
  const [hasSearched, setHasSearched] = useState(false);
  const { books: searchResults, loading: searchLoading, search } = useSearchBooks();

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      setHasSearched(false);
      return;
    }
    setHasSearched(true);
    search(query);
  }, [query, search]);

  const handleClose = () => {
    setQuery("");
    setHasSearched(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🔎 Search for Books" maxWidth="1000px" showFooter={false}
    >
      <div>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for books by title, author, or ISBN..."
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        <div
          className="border rounded p-3"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {hasSearched ? (
            searchLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-2" role="status" />
                <p className="lead text-muted">Searching for books...</p>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="row g-3">
                {searchResults.map((item, index) => (
                  <div key={item.id || index} className="col-md-6">
                    <BookCard item={item} index={index} />
                  </div>
                ))}
              </div>
            ) : randomBooks && randomBooks.length > 0 ? (
              randomBooks.map((item, index) => (
                <div key={item.id || index} className="col-md-4">
                  <BookCard item={item} index={index} />
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <p className="lead text-muted">
                  No books found. Try another search query.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">
                Enter a book title, author name, or ISBN to start searching.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
