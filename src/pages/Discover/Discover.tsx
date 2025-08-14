import { useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import ClubCarousel from "../../components/ClubCarousel";
import useClubData from "../../hooks/useClubData";
import useSearchFilter from "../../hooks/useSearchFilter";
import "./discover.css"

export default function Discover() {
  const { clubs, loading } = useClubData();

  const [currentClubs, setCurrentClubs] = useState(1);
  const clubsPerPage = 3;

  const { filteredData, searchInput, setSearchInput, categoryInput, setCategoryInput } = useSearchFilter(clubs);

  const lastClubsIndex = currentClubs * clubsPerPage;
  const firstClubsIndex = lastClubsIndex - clubsPerPage;

  const currentClubPost = filteredData.slice(firstClubsIndex, lastClubsIndex);

  const nClubs = Math.ceil(filteredData.length/clubsPerPage)
  const numbers = [...Array(nClubs + 1).keys()].slice(1)

  return (
    <>
      <Header />
      <div className="container my-5">
        <NavLink className="btn btn-outline-success my-3" to="/create_club">Create New Group</NavLink>

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
                  value={searchInput}
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  id="searchInput"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <select className="form-select" id="filterSelect"
                onChange={(e) => setCategoryInput(e.target.value)} value={categoryInput}>
                  <option value="">All Categories</option>
                  <option value="biography">Biography</option>
                  <option value="documentary">Documentary</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="fiction">Fiction</option>
                  <option value="historical">Historical</option>
                  <option value="horror">Horror</option>
                  <option value="memoir">Memoir</option>
                  <option value="mystery">Mystery</option>
                  <option value="nonfiction">Non-fiction</option>
                  <option value="romance">Romance</option>
                  <option value="science fiction">Science Fiction</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Fetching awesome book clubs for you...</p>
            </div>
          ) : currentClubPost.length > 0 ? (
                currentClubPost.map((item, index) => (
                <div key={item.id || index} className="col-md-4">
                    <ClubCard item={item} index={index} />
                    
                </div>
                ))
          ) : (
            <p className="text-muted">No book clubs match these filters.</p>
          )}
          <nav className="cursor">
            <ul className="pagination justify-content-center">
              <li className="page-item btn-outline-success">
                <a className="btn btn-outline-success" onClick={prevPage}>Prev</a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentClubs === n ? 'active' : ''}`} key={i}>
                    <a className="btn btn-outline-success" onClick={() => changCurrPage(n)}>{n}</a>
                  </li>
                ))
              }
              <li className="page.item">
                <a className="btn btn-outline-success" onClick={nextPage}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );

  function prevPage() {
    if (currentClubs !== 1) {
        setCurrentClubs(currentClubs - 1)
    }
  }
  
  function nextPage() {
    if (currentClubs !== nClubs) {
        setCurrentClubs(currentClubs + 1)
    }
  }

  function changCurrPage(id) {
    setCurrentClubs(id)
  }
}
