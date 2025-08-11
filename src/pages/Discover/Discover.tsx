import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import NavButton from "../../components/NavButton";
import ClubCarousel from "../../components/ClubCarousel";
import useClubData from "../../hooks/useClubData";

export default function Discover() {
  const { clubs, loading } = useClubData();

  return (
    <>
      <Header />
      <div className="container my-5">
        <NavButton
          className="my-3"
          href="/create-club"
          label="Create New Group"
        />

        <div className="section my-2">
          <h1 className="display-6 py-3">Popular Clubs</h1>

          <ClubCarousel />
        </div>

        <div className="row g-3 my-5">
          <h2 className="display-6 py-3">Book Clubs</h2>

          <div className="container mt-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  id="searchInput"
                />
              </div>

              <div className="col-md-4">
                <select className="form-select" id="filterSelect">
                  <option value="">All Categories</option>
                  <option value="nonfiction">Biography</option>
                  <option value="nonfiction">Documentary</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="fiction">Fiction</option>
                  <option value="nonfiction">Historical</option>
                  <option value="nonfiction">Horror</option>
                  <option value="mystery">Memoir</option>
                  <option value="mystery">Mystery</option>
                  <option value="nonfiction">Non-fiction</option>
                  <option value="mystery">Romance</option>
                  <option value="mystery">Science Fiction</option>
                </select>
              </div>

              <div className="col-md-2">
                <button
                  className="btn btn-outline-success w-100"
                  id="applyFilter"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Fetching awesome book clubs for you...</p>
            </div>
          ) : clubs && clubs.length > 0 ? (
            clubs.map((item, index) => (
              <div key={item.id || index} className="col-md-4">
                <ClubCard item={item} index={index} />
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
