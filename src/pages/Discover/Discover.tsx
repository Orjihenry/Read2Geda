import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useClub } from "../../context/ClubContext";
import { useAuthContext } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import ClubCarousel from "../../components/ClubCarousel";
import useClubData from "../../hooks/useClubData";
import useSearchFilter from "../../hooks/useSearchFilter";
import "./discover.css";

export default function Discover() {
  const { clubs, loading } = useClubData();
  const { getMyClubs } = useClub();
  const { currentUser } = useAuthContext();

  const userId = currentUser?.id;

  const [currentClubs, setCurrentClubs] = useState(1);
  const clubsPerPage = 6;

  const {
    filteredData,
    searchInput,
    setSearchInput,
    categoryInput,
    setCategoryInput,
  } = useSearchFilter(clubs);

  const lastClubsIndex = currentClubs * clubsPerPage;
  const firstClubsIndex = lastClubsIndex - clubsPerPage;

  const currentClubPost = filteredData.slice(firstClubsIndex, lastClubsIndex);

  const nClubs = Math.ceil(filteredData.length / clubsPerPage);
  const numbers = [...Array(nClubs + 1).keys()].slice(1);

  return (
    <>
      <Header />
      <div className="container my-5">
        <NavLink className="btn btn-outline-success my-3" to="/create_club">
          Create New Group
        </NavLink>

        <div className="section my-2">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="display-6 mb-2">My Clubs</h1>
              <p className="text-muted mb-0">Clubs you're actively participating in</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-success fs-6 me-2">
                {getMyClubs(userId || "").length} Active
              </span>
              <NavLink to="/create_club" className="btn btn-outline-success btn-sm">
                <i className="fas fa-plus me-1"></i>
                Create New
              </NavLink>
            </div>
          </div>

          {getMyClubs(userId || "").length > 0 ? (
            <div className="row g-4">
              {getMyClubs(userId || "")
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item, index) => (
                  <div key={item.id || index} className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start mb-3">
                          <div className="flex-shrink-0 me-3">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="rounded-circle"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="card-title mb-1 fw-bold">{item.name}</h5>
                            <p className="text-muted small mb-2">{item.description}</p>
                            <div className="d-flex align-items-center">
                              <span className="badge bg-light text-dark me-2">
                                <i className="fas fa-users me-1"></i>
                                {item.members.length}
                              </span>
                              <span className="badge bg-warning text-dark">
                                <i className="fas fa-star me-1"></i>
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="row g-2 text-center">
                            <div className="col-4">
                              <div className="border-end">
                                <div className="text-dark fw-bold">{item.location || "Online"}</div>
                                <small className="text-muted">Location</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="border-end">
                                <div className="text-success fw-bold">{item.meetingFrequency || "N/A"}</div>
                                <small className="text-muted">Frequency</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="text-info fw-bold">
                                {item.nextMeeting 
                                  ? new Date(item.nextMeeting).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                  : "TBD"
                                }
                              </div>
                              <small className="text-muted">Next Meeting</small>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <NavLink
                            to={`/club/${item.id}`}
                            className="btn btn-outline-success btn-sm flex-fill"
                          >
                            <i className="fas fa-eye me-1"></i>
                            View Details
                          </NavLink>
                          <NavLink
                            to="/discussions"
                            className="btn btn-success btn-sm flex-fill"
                          >
                            <i className="fas fa-comments me-1"></i>
                            Discussions
                          </NavLink>
                        </div>
                      </div>
                      
                      <div className="card-footer bg-light border-0 px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            Joined {new Date(item.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </small>
                          <div className="d-flex gap-1">
                            {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="badge bg-secondary small">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No Clubs Yet</h4>
                <p className="text-muted mb-4">
                  Join your first book club to start connecting with fellow readers!
                </p>
              </div>
              <div className="d-flex gap-2 justify-content-center">
                <NavLink to="/discover" className="btn btn-dark">
                  <i className="fas fa-search me-2"></i>
                  Discover Clubs
                </NavLink>
                <NavLink to="/create_club" className="btn btn-outline-success">
                  <i className="fas fa-plus me-2"></i>
                  Create Club
                </NavLink>
              </div>
            </div>
          )}
        </div>

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
                <select
                  className="form-select"
                  id="filterSelect"
                  onChange={(e) => setCategoryInput(e.target.value)}
                  value={categoryInput}
                >
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
              <div className="spinner-border text-dark mb-2" role="status" />
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
                <a className="btn btn-outline-success" onClick={prevPage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentClubs === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    className="btn btn-outline-success"
                    onClick={() => changCurrPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li className="page.item">
                <a className="btn btn-outline-success" onClick={nextPage}>
                  Next
                </a>
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
      setCurrentClubs(currentClubs - 1);
    }
  }

  function nextPage() {
    if (currentClubs !== nClubs) {
      setCurrentClubs(currentClubs + 1);
    }
  }

  function changCurrPage(id: number) {
    setCurrentClubs(id);
  }
}
