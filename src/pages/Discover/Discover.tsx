import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";
import NavButton from "../../components/NavButton";
import ClubCarousel from "../../components/ClubCarousel";
import useClubData from "../../hooks/useClubData";

export default function Discover() {
  const { clubs, loading } = useClubData();
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const matchesCategory =
      categoryInput === "" ||
      club.tags?.some((tag) => tag.toLowerCase() === categoryInput.toLowerCase());

    return matchesSearch && matchesCategory;
  });

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
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <select className="form-select" id="filterSelect"
                onChange={(e) => setCategoryInput(e.target.value)}>
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
                  <option value="scienceFiction">Science Fiction</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p>📚 Fetching awesome book clubs for you...</p>
            </div>
          ) : filteredClubs.length > 0 ? (
                filteredClubs.map((item, index) => (
                <div key={item.id || index} className="col-md-4">
                    <ClubCard item={item} index={index} />
                </div>
                ))
          ) : (
            <p className="text-muted">No book clubs match these filters.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
