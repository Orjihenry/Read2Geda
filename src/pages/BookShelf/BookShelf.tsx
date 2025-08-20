import BookCard from "../../components/BookCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useBookData from "../../hooks/useBookData";

export default function BookShelf() {
    const { books, loading, error } = useBookData();

  return (
    <>
      <Header />
      <div className="container">

        <div className="row g-3 my-5">
          <h1 className="display-6 py-3">Book Shelf</h1>
          {error && <div className="alert alert-danger text-center mt-4">{error}</div>}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Please wait while we load your next great read...</p>
            </div>
          ) : books && books.length > 0 ? (
            books.map((item, index) => (
              <div key={item.id || index} className="col-md-4">
                <BookCard item={item} index={index} />
              </div>
            ))
          ) : (
            <p className="text-muted">No book clubs available right now.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
