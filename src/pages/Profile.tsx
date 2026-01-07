import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavButton from "../components/NavButton";
import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useClub } from "../context/ClubContext";
import { useFetchImage } from "../hooks/useFetchImage";
import { useAuthContext } from "../context/AuthContext";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookCache } from "../context/BookCacheContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import type { BookData } from "../utils/bookData";
import type { User } from "../types/user";
import placeholderAvatar from "../assets/placeholder.png";
import { MdGroups, MdSearch, MdExpandMore, MdExpandLess, MdShield } from "react-icons/md";
import { FaCrown, FaArrowLeft } from "react-icons/fa";
import "../styles/Profile.css";
import useSearchFilter from "../hooks/useSearchFilter";

export default function Profile() {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { currentUser, getUserById } = useAuthContext();
  const { clubs } = useClub();
  const { updateProgress, getUserBookProgress, getUserBookStartedAt, getUserBookCompletedAt, getCompletedBooks, getToReadBooks, loading } = useSavedBooks();
  const { getBooks } = useBookCache();
  const { openBookSearch } = useBookSearchModal();

  const displayUser = userId ? getUserById(userId) : currentUser;
  const isOwnProfile = !userId || currentUser?.id === userId;
  const isViewingOtherUser = userId && currentUser?.id !== userId;

  const [books, setBooks] = useState<BookData[]>([]);
  const [currentBook, setCurrentBook] = useState<{
    id: string;
    title: string;
    author: string;
    coverImage: string;
    readingProgress: number;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const { imageUrl: avatar } = useFetchImage(displayUser?.avatar, placeholderAvatar);

  useEffect(() => {
    if (!displayUser) return;

    try {
      const userBookIds = Object.keys(displayUser.books || {});
      const userBooks = getBooks(userBookIds);
      setBooks(userBooks);

      if (isOwnProfile) {
        const storedCurrentId = localStorage.getItem("currentBookId");
        let selected: BookData | undefined;
        
        if (storedCurrentId && userBooks.find((b) => b.id === storedCurrentId)) {
          selected = userBooks.find((b) => b.id === storedCurrentId);
        } else if (storedCurrentId === null) {
          selected = undefined;
        } else {
          const readingBookId = Object.entries(displayUser.books || {}).find(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, bookData]) => bookData.status === "reading"
          )?.[0];
          
          selected = readingBookId 
            ? userBooks.find((b) => b.id === readingBookId)
            : userBooks[0];
        }

        if (selected) {
          const userProgress = getUserBookProgress(selected.id);
          setCurrentBook({
            id: selected.id,
            title: selected.title,
            author: selected.author,
            coverImage: selected.coverImage,
            readingProgress: userProgress,
          });
          setProgress(userProgress);
        } else {
          setCurrentBook(null);
          setProgress(0);
        }
      } else {
        setCurrentBook(null);
      }
    } catch (error) {
      console.error("Failed to load books:", error);
    }
  }, [displayUser, getBooks, getUserBookProgress, isOwnProfile]);

  const openModal = () => {
    if (!currentBook) return;
    setProgress(currentBook.readingProgress ?? 0);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveProgress = () => {
    if (!currentBook || !isOwnProfile || !displayUser) return;
    const pct = Math.max(0, Math.min(100, Number(progress) || 0));

    updateProgress(currentBook.id, pct);

    setCurrentBook({ ...currentBook, readingProgress: pct });
    setProgress(pct);
    setShowModal(false);
  };

  const changeCurrentBook = (bookId: string) => {
    if (bookId === "" || bookId === "Select Book") {
      setCurrentBook(null);
      setProgress(0);
      localStorage.removeItem("currentBookId");
      return;
    }

    const next = books.find((b) => b.id === bookId);
    if (!next) return;

    const userProgress = getUserBookProgress(bookId);

    setCurrentBook({
      id: next.id,
      title: next.title,
      author: next.author,
      coverImage: next.coverImage,
      readingProgress: userProgress,
    });
    setProgress(userProgress);
    localStorage.setItem("currentBookId", next.id);
  };

  const myClubsSection = () => {
    const element = document.getElementById("my-clubs-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!displayUser) {
    return (
      <>
        <Header />
        <div className="container my-5 text-center">
          <h2 className="display-6 mb-3">User Not Found</h2>
          <p className="text-muted">The user you're looking for doesn't exist.</p>
          <NavLink to="/" className="btn btn-success">
            <FaArrowLeft className="me-1" />
            Go Home
          </NavLink>
        </div>
        <Footer />
      </>
    );
  }

  const stats = (() => {
    if (!displayUser?.books) return [];

    const userBooks = displayUser.books;
    const completedCount = Object.values(userBooks).filter(
      (book) => book.status === "completed"
    ).length;
    const myClubsCount = clubs.filter((c) => 
      c.members.some((m) => m.id === displayUser.id)
    ).length;

    return [
      { count: completedCount, label: "Books Read" },
      { count: Object.keys(userBooks).length, label: "Books in Shelf" },
      { count: myClubsCount, label: "Clubs Joined" },
    ];
  })();

  const completedBooks = isOwnProfile 
    ? getCompletedBooks(3)
    : books.filter((book) => displayUser.books?.[book.id]?.status === "completed").slice(0, 3);
  
  const toReadBooks = isOwnProfile
    ? getToReadBooks(3)
    : books.filter((book) => displayUser.books?.[book.id]?.status !== "completed").slice(0, 3);

  return (
    <>
      <Header />
      <section className=" py-5 about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="d-flex justify-content-center">
                <img
                  className="rounded shadow mb-3"
                  src={avatar || placeholderAvatar}
                  title=""
                  alt="User Avatar"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 py-4 py-md-0">
              <div className="about-text">
                <h3 className="display-6 dark-color">{displayUser?.name}</h3>
                <p className="lead">
                  {displayUser?.bio ||
                    (isOwnProfile ? "You can edit your profile to add a bio." : "This user hasn't added a bio yet.")}
                </p>

                {isOwnProfile && (
                  <div className="pb-3">
                    <NavButton
                      href="#"
                      className="btn-dark text-light"
                      label="My Clubs"
                      onClick={myClubsSection}
                    />
                    <NavButton
                      href="/edit_profile"
                      className="mx-2"
                      label="Edit Profile"
                    />
                  </div>
                )}
                {isViewingOtherUser && (
                  <div className="pb-3">
                    <button 
                      className="btn btn-outline-success"
                      onClick={() => navigate(-1)}
                    >
                      <FaArrowLeft className="me-1" />
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              {stats.map(({ count, label }, index) => (
                <div key={index} className="col-6 col-lg-4">
                  <div className="count-data text-center">
                    <h6 className="count h2">{count}</h6>
                    <p className="m-0px font-w-600">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isOwnProfile && (
        <section className="py-5">
          <div className="container">
            <h2 className="display-6 text-center mb-5">On My Bookshelf Today</h2>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    {currentBook ? (
                    <div className="text-center mb-4">
                      <img
                        src={currentBook.coverImage}
                        alt={currentBook.title}
                        className="img-fluid rounded shadow-sm mb-3"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                      <h4 className="mb-1">{currentBook.title}</h4>
                      <p className="text-muted mb-3">by {currentBook.author}</p>
                      {books && books.length > 0 && (
                        <div className="d-flex justify-content-center mb-2">
                          <div
                            className="input-group"
                            style={{ maxWidth: 360 }}
                          >
                            <label
                              className="input-group-text"
                              htmlFor="currentBookSelect"
                            >
                              Current
                            </label>
                            <select
                              id="currentBookSelect"
                              className="form-select"
                              value={currentBook?.id || ""}
                              onChange={(e) =>
                                changeCurrentBook(e.target.value)
                              }
                            >
                              <option value="" disabled>Select Book</option>
                              {books.map((b: { id: string; title: string }) => (
                                <option key={b.id} value={b.id}>
                                  {b.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <h5 className="mb-2">No current book yet</h5>
                      <p className="text-muted mb-4">
                        Select a book from your shelf to track your reading progress.
                      </p>
                      
                      {books && books.length > 0 ? (
                        <div className="d-flex flex-column align-items-center gap-3">
                          <select
                            className="form-select"
                            style={{ maxWidth: "400px", width: "100%" }}
                            value=""
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeCurrentBook(e.target.value)}
                          >
                            <option value="" disabled>Select current book</option>
                            {books.map((b: BookData) => (
                              <option key={b.id} value={b.id}>
                                {b.title}
                              </option>
                            ))}
                          </select>
                          <div className="text-muted small mb-2">or</div>
                          <button 
                            className="btn btn-success" 
                            onClick={() => openBookSearch()}
                          >
                            Search for New Books
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-success" 
                          onClick={() => openBookSearch()}
                        >
                          Search for Books
                        </button>
                      )}
                    </div>
                  )}

                  {currentBook && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small text-muted">
                          Reading Progress
                        </span>
                        <span className="small text-muted">
                          {currentBook.readingProgress}%
                        </span>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${currentBook.readingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    {currentBook && (
                      <>
                        <button className="btn btn-outline-success btn-sm me-2">
                          Continue Reading
                        </button>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={openModal}
                        >
                          Update Progress
                        </button>
                      </>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isOwnProfile && showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card shadow" style={{ maxWidth: 420, width: "90%" }}>
            <div className="card-body">
              <h5 className="card-title mb-3">Update Reading Progress</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">0%</small>
                  <small className="text-muted">{Number(progress) || 0}%</small>
                  <small className="text-muted">100%</small>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={100}
                  step={1}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">%</span>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value) || 0)}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={saveProgress}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MyClubsSection isOwnProfile={isOwnProfile} displayUser={displayUser} />

      <div className="py-5">
        <div className="container py-4">
          <h2 className="display-6 mb-4">Last Read Books</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p className="text-muted">Loading completed books...</p>
            </div>
          ) : completedBooks.length > 0 ? (
            <>
              <p className="lead mb-5 font-italic">
                {isOwnProfile ? "You've" : `${displayUser.name} has`} completed {completedBooks.length} book{completedBooks.length !== 1 ? "s" : ""}!
              </p>
              <div className="row g-3">
                {completedBooks.slice(0, 6).map((book) => {
                  const startedAt = isOwnProfile ? getUserBookStartedAt(book.id) : displayUser.books?.[book.id]?.startedAt;
                  const completedAt = isOwnProfile ? getUserBookCompletedAt(book.id) : displayUser.books?.[book.id]?.completedAt;
                  const progress = isOwnProfile ? getUserBookProgress(book.id) : displayUser.books?.[book.id]?.progress;
                  
                  return (
                    <div key={book.id} className="col-md-4">
                      <BookCard 
                        item={book} 
                        progress={progress}
                        startedAt={startedAt}
                        completedAt={completedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-muted">No completed books yet.</p>
          )}
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-4">
          <h2 className="display-6 pb-4">Latest Books in Shelf</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-2" role="status" />
              <p className="text-muted">Loading your books...</p>
            </div>
          ) : (
            <div className="row g-3">
              {toReadBooks.length > 0 ? (
                toReadBooks.slice(0, 6).map((book) => {
                  const startedAt = isOwnProfile ? getUserBookStartedAt(book.id) : displayUser.books?.[book.id]?.startedAt;
                  const completedAt = isOwnProfile ? getUserBookCompletedAt(book.id) : displayUser.books?.[book.id]?.completedAt;
                  
                  return (
                    <div key={book.id} className="col-md-4">
                      <BookCard 
                        item={book} 
                        startedAt={startedAt}
                        completedAt={completedAt}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-muted">{isOwnProfile ? "Add books to your reading list to see them here." : "No books in shelf yet."}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

function ClubsImageUrl({ imageId, fallback }: { imageId?: string; fallback?: string }) {
  const { imageUrl } = useFetchImage(imageId, fallback);
  return (
    <img
      src={imageUrl || fallback}
      alt="club"
      className="rounded me-3 flex-shrink-0"
      style={{ width: 60, height: 60, objectFit: "cover" }}
    />
  );
}

function MyClubsSection({ isOwnProfile, displayUser }: { isOwnProfile: boolean; displayUser: User | null }) {
  const { getMyClubs } = useClub();
  const [showAll, setShowAll] = useState(false);
  
  const myClubs = displayUser ? getMyClubs(displayUser.id) : [];
  const { filteredData: filteredClubs, searchInput: searchQuery, setSearchInput: setSearchQuery } = useSearchFilter(myClubs);
  
  if (!displayUser) return null;
  
  const INITIAL_DISPLAY_COUNT = 6;
  const userId = displayUser.id;

  if (myClubs.length === 0) return null;

  const sortedClubs = filteredClubs.sort((a, b) => {
    const aRole = a.members.find((m) => m.id === userId)?.role || "member";
    const bRole = b.members.find((m) => m.id === userId)?.role || "member";
    const roleOrder: Record<string, number> = { owner: 0, moderator: 1, member: 2 };
    return roleOrder[aRole] - roleOrder[bRole];
  });

  const displayCount = showAll ? sortedClubs.length : Math.min(INITIAL_DISPLAY_COUNT, sortedClubs.length);
  const clubsToShow = sortedClubs.slice(0, displayCount);
  const hasMore = sortedClubs.length > INITIAL_DISPLAY_COUNT;

  const getUserRole = (clubId: string) => {
    const club = myClubs.find((c) => c.id === clubId);
    return club?.members.find((m) => m.id === userId)?.role || "member";
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "owner":
        return (
          <span className="badge bg-warning text-dark">
            <FaCrown className="me-1" />
            Owner
          </span>
        );
      case "moderator":
        return (
          <span className="badge bg-info text-dark">
            <MdShield className="me-1" />
            Moderator
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="my-clubs-section" className="py-5 bg-light">
      <div className="container">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0 d-flex align-items-center">
                <MdGroups className="me-2" />
                {isOwnProfile ? "My Clubs" : `${displayUser.name}'s Clubs`} ({myClubs.length})
              </h3>
              {myClubs.length > INITIAL_DISPLAY_COUNT && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? (
                    <>
                      <MdExpandLess className="me-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <MdExpandMore className="me-1" />
                      Show All
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <div className="input-group input-group-sm">
                <span className="input-group-text">
                  <MdSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search clubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>
              {searchQuery && (
                <small className="text-muted">
                  {filteredClubs.length} club{filteredClubs.length !== 1 ? "s" : ""} found
                </small>
              )}
            </div>

            {filteredClubs.length === 0 ? (
              <p className="text-muted text-center py-3">No clubs found matching your search.</p>
            ) : (
              <>
                <div className="row g-3">
                  {clubsToShow.map((club) => {
                    const userRole = getUserRole(club.id);
                    return (
                      <div key={club.id} className="col-md-6 col-lg-4">
                        <NavLink
                          to={`/club/${club.id}`}
                          className="text-decoration-none"
                        >
                          <div className="card h-100 border club-card-hover">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-start">
                                <ClubsImageUrl imageId={club.imageUrl} />
                                <div className="flex-grow-1 min-w-0">
                                  <h6 className="card-title mb-1 text-truncate" title={club.name}>
                                    {club.name}
                                  </h6>
                                  <p
                                    className="text-muted small mb-2"
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {club.description || "No description"}
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <small className="text-muted">
                                      {club.members.length} member{club.members.length !== 1 ? "s" : ""}
                                    </small>
                                    {getRoleBadge(userRole)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
                </div>

                {hasMore && !showAll && (
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setShowAll(true)}
                    >
                      <MdExpandMore className="me-1" />
                      Show {sortedClubs.length - INITIAL_DISPLAY_COUNT} More Clubs
                    </button>
                  </div>
                )}

                {showAll && hasMore && (
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        setShowAll(false);
                        setSearchQuery("");
                      }}
                    >
                      <MdExpandLess className="me-1" />
                      Show Less
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
