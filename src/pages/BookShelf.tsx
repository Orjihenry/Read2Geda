import { useState, useMemo } from "react";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useAuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import BookSearchModal from "../components/BookSearchModal";
import Swal from "sweetalert2";

export default function BookShelf() {
  const { books, loading, removeBook } = useSavedBooks();
  const { currentUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const bookList = useMemo(() => {
    if (!currentUser || !books) return [];
    return books.filter(book => {
      const userProgress = book.readingProgress?.find(
        p => p.userId === currentUser.id
      );
      return !userProgress || userProgress.status !== "completed";
    });
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
              📚 My Shelf <span className="text-muted">({bookList?.length || 0})</span>
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
          ) : bookList && bookList.length > 0 ? (
            bookList.map((item, index) => {
              return (
                <div key={item.id || index} className="col-md-4">
                  <BookCard
                    item={item}
                    actions={{
                      onRemove: async () => {
                        const { isConfirmed } = await Swal.fire({
                          title: "Remove from Shelf?",
                          text: `Are you sure you want to remove "${item.title}" from your personal shelf?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, Remove",
                          cancelButtonText: "Cancel",
                          confirmButtonColor: "#dc3545",
                        });
                        if (isConfirmed) {
                          removeBook(item.id);
                          Swal.fire("Removed", `${item.title} removed from your shelf.`, "success");
                        }
                      },
                      onReadClick: () => {
                        // TODO: Implement book reading functionality
                      },
                    }}
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
          <h2 className="mb-3"> 📚 Completed Books <span className="text-muted">({completedBooks?.length || 0})</span></h2>

          <div className="row g-3">
            {completedBooks && completedBooks.length > 0 ? (
              completedBooks.map((item, index) => {
                return (
                  <div key={item.id || index} className="col-md-4">
                    <BookCard
                      item={item}
                      actions={{
                        onRemove: async () => {
                          const { isConfirmed } = await Swal.fire({
                            title: "Remove from Shelf?",
                            text: `Are you sure you want to remove "${item.title}" from your personal shelf?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, Remove",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#dc3545",
                          });
                          if (isConfirmed) {
                            removeBook(item.id);
                            Swal.fire("Removed", `${item.title} removed from your shelf.`, "success");
                          }
                        },
                        onReadClick: () => {
                          // TODO: Update button text & functionality
                        },
                      }}
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

      <BookSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Footer />
    </>
  );
}