import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookCache } from "../context/BookCacheContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import type { BookData } from "../utils/bookData";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard, { type BookCardActions } from "../components/BookCard";
import { confirmAlert, notifyAlert, sweetAlert } from "../alerts/sweetAlert";
import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle, MdPlayArrow, MdRefresh } from "react-icons/md";

export default function BookShelf() {
  const { removeBook, getCompletedBooks, getToReadBooks, getUserBookProgress, getUserBookStartedAt, getUserBookCompletedAt, updateProgress, setUserBookRating } = useSavedBooks();
  const { loading } = useBookCache();
  const { openBookSearch } = useBookSearchModal();

  const completedBooks = getCompletedBooks();
  const bookList = getToReadBooks();

  const handleStartReading = useCallback((book: BookData) => {
    updateProgress(book.id, 1);
  }, [updateProgress]);

  const promptForRating = useCallback(async (book: BookData): Promise<number | null> => {
    const { value, isConfirmed } = await sweetAlert.fire({
      title: "Rate this book",
      text: book.title,
      input: "select",
      inputOptions: {
        5: "5 - Excellent",
        4: "4 - Great",
        3: "3 - Good",
        2: "2 - Fair",
        1: "1 - Poor",
      },
      inputPlaceholder: "Select rating",
      showCancelButton: true,
      confirmButtonText: "Submit Rating",
      cancelButtonText: "Skip",
    });

    if (!isConfirmed || !value) return null;
    return Number(value);
  }, []);

  const handleMarkAsCompleted = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Mark as Completed?",
      text: `"${book.title}" will be moved to your completed books section.`,
      icon: "question",
      confirmText: "Yes, Mark as Completed",
      cancelText: "Cancel",
    });

    if (isConfirmed) {
      const ratingValue = await promptForRating(book);
      if (ratingValue == null) return;
      setUserBookRating(book.id, ratingValue);
      updateProgress(book.id, 100);
      notifyAlert({
        title: "Completed!",
        text: `"${book.title}" has been marked as completed.`,
        icon: "success",
        options: {
          timer: 2000,
          showConfirmButton: true,
        },
      });
    }
  }, [updateProgress, promptForRating, setUserBookRating]);

  const handleResetProgress = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Reset Progress?",
      text: "Started and Completed metadata will be lost.",
      icon: "question",
      confirmText: "Yes, Reset",
      cancelText: "Cancel",
    });

    if (isConfirmed) {
      updateProgress(book.id, 0);
      notifyAlert({
        title: "Reset!",
        text: `Progress for "${book.title}" has been reset.`,
        icon: "success",
        options: {
          timer: 2000,
          showConfirmButton: true,
        },
      });
    }
  }, [updateProgress]);

  const handleRemoveBook = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Remove from Shelf?",
      text: `Are you sure you want to remove "${book.title}"?`,
      icon: "warning",
      confirmText: "Yes, Remove",
      cancelText: "Cancel",
    });
  
    if (isConfirmed) {
      removeBook(book.id);
      notifyAlert({
        title: "Removed",
        text: `${book.title} removed.`,
        icon: "success",
      });
    }
  }, [removeBook]);

  const shelfBooksActions = (item: BookData, progress: number): BookCardActions[] => {
    const started = progress > 0;

    return [
      {
        key: "read",
        label: started ? "Mark as Completed" : "Start Reading",
        icon: started ? 
          <MdCheckCircle className="me-1" /> : <MdPlayArrow className="me-1" />,
        className: started ? "btn btn-outline-success flex-fill" : "btn btn-success flex-fill",
        onClick: () => {
          if (started) {
            handleMarkAsCompleted(item);
          } else {
            handleStartReading(item);
          }
        },
      },
      {
        key: "remove",
        title: "Remove",
        icon: <IoMdClose className="me-1" />,
        className: "btn btn-outline-danger",
        onClick: () => handleRemoveBook(item),
      }
    ];
  };

  const completedBooksActions = (item: BookData): BookCardActions[] => [
    {
      key: "reset",
      label: "Reset Progress",
      icon: <MdRefresh className="me-1" />,
      className: "btn btn-outline-success flex-fill",
      onClick: () => handleResetProgress(item),
    },
    {
      key: "remove",
      title: "Remove",
      icon: <IoMdClose className="me-1" />,
      className: "btn btn-outline-danger",
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
              const startedAt = getUserBookStartedAt(item.id);
              const completedAt = getUserBookCompletedAt(item.id);

              return (
                <div key={item.id} className="col-md-4">
                  <BookCard
                    item={item}
                    actions={shelfBooksActions(item, progress)}
                    progress={progress}
                    showProgress={true}
                    onProgressChange={(newProgress) => updateProgress(item.id, newProgress)}
                    startedAt={startedAt}
                    completedAt={completedAt}
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
                const startedAt = getUserBookStartedAt(item.id);
                const completedAt = getUserBookCompletedAt(item.id);

                return (
                  <div key={item.id} className="col-md-4">
                    <BookCard
                      item={item}
                      actions={completedBooksActions(item)}
                      progress={progress}
                      showProgress={true}
                      onProgressChange={(newProgress) => updateProgress(item.id, newProgress)}
                      startedAt={startedAt}
                      completedAt={completedAt}
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