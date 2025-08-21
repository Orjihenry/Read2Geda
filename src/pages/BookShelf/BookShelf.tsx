import BookCard from "../../components/BookCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useBookData from "../../hooks/useBookData";

export default function BookShelf() {
  const { books, loading } = useBookData();

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 my-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-6 py-3">📚 My Shelf <span className="text-muted">({books?.length || 0})</span></h1>
            <a href="#explore"className="btn btn-outline-success">Add Book</a>
          </div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Please wait while we load your favourite reads...</p>
            </div>
          ) : books && books.length > 0 ? (
            books.map((item, index) => (
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
          <h2 className="mb-3">🔎 Explore Books</h2>
          <div className="input-group mb-4">
            <input type="text" className="form-control" placeholder="Search for books..." />
            <button className="btn btn-outline-success">Search</button>
          </div>
          <div className="row g-3">
            {books && books.length > 0 ? (
              books.map((item, index) => (
                <div key={item.id || index} className="col-md-4">
                  <BookCard item={item} index={index} />
                </div>
              ))
            ) : (
              <p className="lead text-muted">No books found. Try a different search.</p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
