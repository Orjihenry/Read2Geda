import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookCache } from "../context/BookCacheContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import { useShelfHandlers } from "../hooks/useShelfHandlers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard from "../components/BookCard";

export default function BookShelf() {
  const { getCompletedBooks, getToReadBooks, getUserBookProgress, getUserBookStartedAt, getUserBookCompletedAt, updateProgress } = useSavedBooks();
  const { loading } = useBookCache();
  const { openBookSearch } = useBookSearchModal();
  const { shelfBooksActions, completedBooksActions } = useShelfHandlers();

  const completedBooks = getCompletedBooks();
  const bookList = getToReadBooks();


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