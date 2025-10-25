import BookCarousel from "../../components/BookCarousel";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import { useEffect, useState } from "react";
import { useClub } from "../../context/ClubContext";
import { useAuthContext } from "../../context/AuthContext";
import { useImageStorage } from "../../hooks/useImageStorage";
import { useSavedBooks } from "../../context/SavedBooksContext";
import type { BookData, BookProgress } from "../../utils/bookData";
import "./Profile.css";
import placeholderAvatar from "../../assets/placeholder.png";

export default function Profile() {
  const { currentUser } = useAuthContext();
  const { getImage } = useImageStorage();
  const { clubs } = useClub();
  const { getReadingProgress, updateProgress, getUserBookProgress } = useSavedBooks();

  const currentClub = clubs.find(
    (club) => club.isActive && club.members.length > 0
  );

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
  const [avatar, setAvatar] = useState<string>("");
  const [progressList, setProgressList] = useState<BookProgress[]>([]);

  useEffect(() => {
    const loadAvatar = async () => {
      if (!currentUser?.avatar) {
        setAvatar(placeholderAvatar);
        return;
      }

      const blob = await getImage(currentUser?.avatar);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setAvatar(url);
      }
    };
    loadAvatar();
  }, [currentUser, getImage]);

  useEffect(() => {
    if (!currentUser) return;

    const list = getReadingProgress(currentUser.id);
    setProgressList(list);
  }, [currentUser, getReadingProgress]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookData");
      const localBooks = stored ? JSON.parse(stored) : [];
      setBooks(localBooks);

      const storedCurrentId = localStorage.getItem("currentBookId");
      let selected;
      
      if (storedCurrentId) {
        selected = localBooks.find((b: { id: string }) => b.id === storedCurrentId);
      } else {
        const currentProgress = progressList.find((p) => p.status === "reading") || progressList[0];
        selected = currentProgress
          ? localBooks.find((b: { id: string }) => b.id === currentProgress.bookId)
          : localBooks[0];
      }

      if (selected) {
        const userProgress = progressList.find((p) => p.bookId === selected.id);
        setCurrentBook({
          id: selected.id,
          title: selected.title,
          author: selected.author,
          coverImage: selected.coverImage,
          readingProgress: userProgress?.progress ?? 0,
        });
        setProgress(userProgress?.progress ?? 0);
      }
    } catch {
      console.error("Failed to load books from localStorage");
    }
  }, [progressList]);

  const openModal = () => {
    if (!currentBook) return;
    setProgress(currentBook.readingProgress ?? 0);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveProgress = () => {
    if (!currentBook || !currentUser) return;
    const pct = Math.max(0, Math.min(100, Number(progress) || 0));

    updateProgress(currentUser.id, currentBook.id, pct);

    setCurrentBook({ ...currentBook, readingProgress: pct });
    setShowModal(false);
  };

  const changeCurrentBook = (bookId: string) => {
    const next = books.find((b: { id?: string }) => b.id === bookId);
    if (!next) return;

    const userProgress = getUserBookProgress(currentUser?.id || "", bookId);

    setCurrentBook({
      id: next.id,
      title: next.title,
      author: next.author,
      coverImage: next.coverImage,
      readingProgress: userProgress ?? 0,
    });
    setProgress(userProgress ?? 0);
    localStorage.setItem("currentBookId", next.id);
  };

  const stats = [
    { count: 5, label: "Books Read" },
    { count: 150, label: "Contributions" },
    { count: 650, label: "Likes / Votes" },
    { count: 12, label: "Club Calls Attended" },
  ];

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
                  src={avatar}
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
                <h3 className="display-6 dark-color">{currentUser?.name}</h3>
                <p className="lead">
                  {currentUser?.bio ||
                    "You can edit your profile to add a bio."}
                </p>

                <div className="pb-3">
                  <NavButton
                    href="#"
                    className="btn-dark text-light"
                    label="My Clubs"
                  />
                  <NavButton
                    href="edit_profile"
                    className="mx-2"
                    label="Edit Profile"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              {stats.map(({ count, label }, index) => (
                <div key={index} className="col-6 col-lg-3">
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
                              value={currentBook?.id}
                              onChange={(e) =>
                                changeCurrentBook(e.target.value)
                              }
                            >
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
                    <div className="text-center mb-4">
                      <h5 className="mb-1">No current book yet</h5>
                      <p className="text-muted">
                        Add a book to your shelf to track progress.
                      </p>
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

                  {currentClub && (
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                          >
                            <span className="text-white fw-bold">
                              {currentClub.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{currentClub.name}</h6>
                          <small className="text-muted">
                            {currentClub.meetingFrequency} •{" "}
                            {currentClub.members.length} members
                          </small>
                        </div>
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

      {showModal && (
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

      <div className="container">
        <div className="section text-center py-5 my-5">
          <h2 className="display-6 mb-4">Read Books</h2>
          <p className="lead mb-5 font-italic">
            “If you want a picture of the future, imagine a boot stamping
            forever.”
            <br />
            <small className="font-italic">George Orwell - 1984</small>
          </p>

          <BookCarousel />
        </div>

        <div className="section text-center py-5 my-5 bg-light">
          <h2 className="display-6 mb-4">Wishlist</h2>

          <BookCarousel />
        </div>
      </div>

      <Footer />
    </>
  );
}
