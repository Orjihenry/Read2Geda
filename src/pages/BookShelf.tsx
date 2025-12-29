import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookCache } from "../context/BookCacheContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import type { BookData } from "../utils/bookData";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard, { type BookCardActions } from "../components/BookCard";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";

export default function BookShelf() {
  const { removeBook, getCompletedBooks, getToReadBooks, getUserBookProgress, updateProgress } = useSavedBooks();
  const { loading } = useBookCache();
  const { openBookSearch } = useBookSearchModal();

  const completedBooks = getCompletedBooks();
  const bookList = getToReadBooks();

  const handleRemoveBook = useCallback(async (book: BookData) => {
    const { isConfirmed } = await Swal.fire({
      title: "Remove from Shelf?",
      text: `Are you sure you want to remove "${book.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-success",
      },
    });
  
    if (isConfirmed) {
      removeBook(book.id);
      Swal.fire({
        title: "Removed",
        text: `${book.title} removed.`,
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success"
        },
      });
    }
  }, [removeBook]);

  const shelfBooksActions = (item: BookData, progress: number): BookCardActions[] => {
    const started = progress > 0;

    return [
      {
        key: "read",
        label: started ? "Continue Reading" : "Start Reading",
        icon: <MdPlayArrow className="me-1" />,
        className: started ? "btn btn-outline-success flex-fill" : "btn btn-success flex-fill",
        onClick: () => console.log("Reading book", item.id),
      },
      {
        key: "remove",
        icon: <IoMdClose className="me-1" />,
        className: "btn btn-outline-danger",
        onClick: () => handleRemoveBook(item),
      }
    ];
  };

  const completedBooksActions = (item: BookData): BookCardActions[] => [
    {
      key: "remove",
      label: "Remove",
      icon: <IoMdClose className="me-1" />,
      className: "btn btn-outline-danger w-100",
      onClick: () => handleRemoveBook(item),
    }
  ];

  return (
    <>
      <Header />

      <div className="container">
        <div className="row g-3 my-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-6 py-3">
              📚 My Shelf <span className="text-muted">({bookList?.length || 0})</span>
            </h1>

            <button onClick={() => openBookSearch()} className="btn btn-success">
              Add Book
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Please wait while we load your favourite reads...</p>
            </div>
          ) : bookList?.length ? (
            bookList.map((item) => {
              const progress = getUserBookProgress(item.id);

              return (
                <div key={item.id} className="col-md-4">
                  <BookCard
                    item={item}
                    actions={shelfBooksActions(item, progress)}
                    progress={progress}
                    showProgress={true}
                    onProgressChange={(newProgress) => updateProgress(item.id, newProgress)}
                  />
                </div>
              );
            })
          ) : (
            <p className="lead text-muted">Your shelf is empty. Start exploring and add some books!</p>
          )}
        </div>
      </div>

      <div className="my-5 bg-light" id="explore">
        <section className="container py-5">
          <h2 className="mb-3">
            📚 Completed Books <span className="text-muted">({completedBooks.length})</span>
          </h2>

          <div className="row g-3">
            {completedBooks.length ? (
              completedBooks.map((item) => {
                const progress = getUserBookProgress(item.id);

                return (
                  <div key={item.id} className="col-md-4">
                    <BookCard
                      item={item}
                      actions={completedBooksActions(item)}
                      progress={progress}
                      showProgress={true}
                      onProgressChange={(newProgress) => updateProgress(item.id, newProgress)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="lead text-muted">No completed books yet.</p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}