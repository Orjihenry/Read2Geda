import { useState, useCallback } from "react";
import Modal from "./Modal";
import BookCard, { type BookCardActions } from "./BookCard";
import useSearchBooks from "../hooks/useSearchBooks";
import useRandomBooks from "../hooks/useOpenLibrary";
import { useBookActions } from "../hooks/useBookActions";
import { MdOutlineFavorite } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

type BookSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clubId?: string;
};

export default function BookSearchModal({ isOpen, onClose, clubId }: BookSearchModalProps) {
  const [query, setQuery] = useState("");
  const { books: randomBooks } = useRandomBooks();
  const [hasSearched, setHasSearched] = useState(false);
  const { books: searchResults, loading: searchLoading, search } = useSearchBooks();
  const { handleAddBook, handleRemoveBook, getBookStatus } = useBookActions({ clubId });

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      setHasSearched(false);
      return;
    }
    setHasSearched(true);
    search(query);
  }, [query, search]);

  const handleClose = useCallback(() => {
    setQuery("");
    setHasSearched(false);
    onClose();
  }, [onClose]);

  const renderBookCard = useCallback((item: typeof searchResults[0], index: number) => {
    const { inClubShelf, canModifyClub } = getBookStatus(item.id);

    const actions: BookCardActions[] = [];
    
    if (clubId && inClubShelf && canModifyClub) {
      actions.push({
        key: "remove",
        label: "Remove",
        icon: <IoMdClose className="me-1" />,
        className: "btn btn-outline-danger flex-fill",
        title: "Remove from club",
        onClick: () => handleRemoveBook(item),
      });
    }
    
    actions.push({
      key: "add",
      label: "Add",
      icon: <MdOutlineFavorite className="me-1" />,
      className: actions.length > 0 ? "btn btn-outline-success flex-fill" : "btn btn-outline-success w-100",
      title: "Add to shelf",
      onClick: () => handleAddBook(item),
    });

    return (
      <div key={item.id || index} className={hasSearched ? "col-md-6" : "col-md-4"}>
        <BookCard
          item={item}
          actions={actions}
        />
      </div>
    );
  }, [hasSearched, clubId, getBookStatus, handleAddBook, handleRemoveBook]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🔎 Search for Books" maxWidth="1000px" showFooter={false}>
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
                {searchResults.map(renderBookCard)}
              </div>
            ) : randomBooks && randomBooks.length > 0 ? (
              <div className="row g-3">
                {randomBooks.map(renderBookCard)}
              </div>
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
