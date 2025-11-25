import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookCache } from "../context/BookCacheContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookCard, { type BookCardActions } from "../components/BookCard";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";

export default function BookShelf() {
  const { removeBook, getCompletedBooks, getToReadBooks, getUserBookProgress } = useSavedBooks();
  const { loading } = useBookCache();
  const { openBookSearch } = useBookSearchModal();

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
            <div className="d-flex gap-2">
              <button
                onClick={() => openBookSearch()}
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
              const progress = getUserBookProgress(item.id);
              const hasStartedReading = progress > 0;
              const actionsLength = 2;
              const actions: BookCardActions[] = [
                {
                  key: "read",
                  label: hasStartedReading ? "Continue Reading" : "Start Reading",
                  icon: <MdPlayArrow className="me-1" />,
                  className: `btn ${hasStartedReading ? "btn-outline-success" : "btn-success"} ${actionsLength > 1 ? "flex-fill" : "w-100"}`,
                  title: hasStartedReading ? "Continue Reading" : "Start Reading",
                  onClick: () => {
                    console.log("Reading book", item.id);
                  },
                },
                {
                  key: "remove",
                  icon: <IoMdClose className="me-1" />,
                  className: `btn btn-outline-danger ${actionsLength > 1 ? "" : "w-100"}`,
                  title: "Remove from shelf",
                  onClick: async () => {
                    const { isConfirmed } = await Swal.fire({
                      title: "Remove from Shelf?",
                      text: `Are you sure you want to remove "${item.title}" from your personal shelf?`,
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
                      removeBook(item.id);
                      Swal.fire({
                        title: "Removed",
                        text: `${item.title} removed from your shelf.`,
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                          confirmButton: "btn btn-success",
                        },
                      });
                    }
                  },
                }
              ];

              return (
                <div key={item.id || index} className="col-md-4">
                  <BookCard
                    item={item}
                    actions={actions}
                    progress={progress}
                    showProgress={true}
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
                const progress = getUserBookProgress(item.id);
                const actions: BookCardActions[] = [
                  {
                    key: "remove",
                    label: "Remove",
                    icon: <IoMdClose className="me-1" />,
                    className: "btn btn-outline-danger w-100",
                    title: "Remove from shelf",
                    onClick: async () => {
                      const { isConfirmed } = await Swal.fire({
                        title: "Remove from Shelf?",
                        text: `Are you sure you want to remove "${item.title}" from your personal shelf?`,
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
                        removeBook(item.id);
                        Swal.fire({
                          title: "Removed",
                          text: `${item.title} removed from your shelf.`,
                          icon: "success",
                          confirmButtonText: "OK",
                          customClass: {
                            confirmButton: "btn btn-success",
                          },
                        });
                      }
                    },
                  },
                ];

                return (
                  <div key={item.id || index} className="col-md-4">
                    <BookCard
                      item={item}
                      actions={actions}
                      progress={progress}
                      showProgress={true}
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