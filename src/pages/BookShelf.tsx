import { useState, useMemo } from "react";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useAuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import BookSearchModal from "../components/BookSearchModal";

export default function BookShelf() {
  const { books, loading } = useSavedBooks();
  const { currentUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const wishListBooks = useMemo(() => {
    if (!currentUser || !books) return [];
    return books.filter((book) =>
      book.readingProgress?.find((progress) => progress.userId === currentUser.id && (progress.status === "not_started" || progress.status === "reading" || progress.status === "paused"))
    ) || [];
  }, [books, currentUser]);

  const completedBooks = useMemo(() => {
    if (!currentUser || !books) return [];
    return books.filter((book) =>
      book.readingProgress?.some(
        (progress) =>
          progress.userId === currentUser.id &&
          progress.status === "completed"
      )
    );
  }, [books, currentUser]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 my-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-6 py-3">
              📚 My Shelf <span className="text-muted">({books?.length || 0})</span>
            </h1>
            <div className="d-flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-success"
              >
                Add Book
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Please wait while we load your favourite reads...</p>
            </div>
          ) : wishListBooks && wishListBooks.length > 0 ? (
            wishListBooks.map((item, index) => (
              <div key={item.id || index} className="col-md-4">
                <BookCard item={item} index={index} />
              </div>
            ))
          ) : (
            <p className="lead text-muted">Your shelf is empty. Start exploring and add some books!</p>
          )}
        </div>
      </div>

      <div className="my-5 bg-light" id="explore">
        <section className="container py-5">
          <h2 className="mb-3"> 📚 Completed Books</h2>

          <div className="row g-3">
            {completedBooks && completedBooks.length > 0 ? (
              completedBooks.map((item, index) => (
                <div key={item.id || index} className="col-md-4">
                  <BookCard item={item} index={index} />
                </div>
              ))
            ) : (
              <p className="lead text-muted">No completed books yet.</p>
            )}
          </div>
        </section>
      </div>

      <BookSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Footer />
    </>
  );
}