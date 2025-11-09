import { NavLink, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JoinClubButton from "../components/JoinClubButton";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import type { BookData } from "../utils/bookData";
import { useClub } from "../context/ClubContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useImageStorage } from "../hooks/useImageStorage";
import placeholderClubImage from "../assets/bookClub.jpg";
import { useAuthContext } from "../context/AuthContext";
import useBookData from "../hooks/useBookData";
import BookSearchModal from "../components/BookSearchModal";
import { type ClubBook } from "../utils/bookClub";
import BookCard from "../components/BookCard";
import { useSavedBooks } from "../context/SavedBooksContext";
import Swal from "sweetalert2";

export default function ClubDetails() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { clubs, deleteClub, getClubBooks, removeBookFromClub, isModerator } = useClub();
  const [upcomingBooks, setUpcomingBooks] = useState<ClubBook[]>([]);
  const [completedBooks, setCompletedBooks] = useState<ClubBook[]>([]);
  const { books } = useBookData();
  const { currentUser } = useAuthContext();
  const { isInShelf, addBook } = useSavedBooks();
  const userId = currentUser?.id || "";
  
  useEffect(() => {
    if (!clubId || !books) return;

    const allClubBooks = getClubBooks(clubId) || [];
    
    const completed = allClubBooks.filter((clubBook) => {
      return clubBook.status === "completed";
    });
    
    const upcoming = allClubBooks.filter((clubBook) => {
      return clubBook.status !== "completed";
    });

    setCompletedBooks(completed);
    setUpcomingBooks(upcoming);
  }, [clubId, clubs, getClubBooks, books]);


  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { getImage, loading } = useImageStorage();
  const club = clubs.find((c) => c.id === clubId);

  useEffect(() => {
    if (!club) return;
    let revokeUrl: string | null = null;

    const loadImage = async () => {
      if (!club.imageUrl) {
        setImageUrl(placeholderClubImage);
        return;
      }
      if (club.imageUrl.length === 36 && !club.imageUrl.includes("/")) {
        const blob = await getImage(club.imageUrl);
        if (blob) {
          const url = URL.createObjectURL(blob);
          revokeUrl = url;
          setImageUrl(url);
        } else {
          setImageUrl(placeholderClubImage);
        }
      } else {
        setImageUrl(club.imageUrl);
      }
    };
    loadImage();

    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [getImage, club?.imageUrl, club]);

  const handleDeleteClub = () => {
    if (clubId) {
      deleteClub(clubId);
      navigate("/clubs");
    }
  };

  const handleUpdateClub = () => {
    if (clubId) {
      navigate(`/club/${clubId}/update`);
    }
  };

  if (!club) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <BackButton />
          <div className="text-center py-5">
            <h1 className="display-6">Club Not Found</h1>
            <p className="lead">
              The book club you're looking for doesn't exist.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <BackButton />

        <div className="py-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center">
                {loading ? (
                  <div className="spinner-border text-success" />
                ) : (
                  <img
                    src={imageUrl || placeholderClubImage}
                    alt={`${club.name} club image`}
                    className="rounded shadow img-fluid"
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="ms-3">
                  <h1 className="display-6 mb-2">{club.name}</h1>
                  <p className="lead mb-0">{club.description}</p>
                </div>
              </div>
            </div>
            <div className="ms-3 d-flex gap-2">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={handleUpdateClub}
                title="Update Club"
              >
                <FaEdit className="me-1" />
                Update
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setShowDeleteConfirm(true)}
                title="Delete Club"
              >
                <FaTrash className="me-1" />
                Delete
              </button>
            </div>
          </div>

          <div className="d-flex gap-2 pt-2 justify-content-start">
            <JoinClubButton clubId={clubId} />
            <NavLink
              to="/discussions"
              className="btn btn-outline-success btn-sm"
            >
              Discussion Board
            </NavLink>
          </div>
        </div>
      </div>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="container py-5">
            <CurrentBookSection />
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="display-6 py-2">Club Reviews</h2>
        <NavLink to="" className="btn btn-dark btn-md">
          Discussion Questions
        </NavLink>

        <div className="py-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            nisi id exercitationem dignissimos expedita veritatis error fugiat
            assumenda sunt et quis earum, temporibus architecto? At delectus sit
            dolor rem facilis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            nisi id exercitationem dignissimos expedita veritatis error fugiat
            assumenda sunt et quis earum, temporibus architecto? At delectus sit
            dolor rem facilis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            nisi id exercitationem dignissimos expedita veritatis error fugiat
            assumenda sunt et quis earum, temporibus architecto? At delectus sit
            dolor rem facilis?
          </p>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-4">
          <h3 className="display-6 pb-2">Other Books On Our List</h3>
          {upcomingBooks.length > 0 ? (
            <div className="row g-3">
              {upcomingBooks.map((clubBook, index) => {
                const book = books?.find((b) => b.id === clubBook.bookId);
                if (!book) return null;

                const inPersonalShelf = isInShelf(book.id);
                const canModifyClub = clubId ? isModerator(clubId, userId) : false;

                return (
                  <div key={clubBook.bookId || index} className="col-md-4">
                    <BookCard
                      item={book}
                      actions={{
                        onAdd: !inPersonalShelf ? () => {
                          addBook(book);
                          Swal.fire({
                            title: "Added!",
                            text: `${book.title} added to your shelf.`,
                            icon: "success",
                            confirmButtonColor: "#198754",
                          });
                        } : undefined,
                        onRemove: canModifyClub ? async () => {
                          if (!clubId) return;
                          const { isConfirmed } = await Swal.fire({
                            title: "Remove from Club?",
                            text: `Are you sure you want to remove "${book.title}" from ${club?.name || "the club"}?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, Remove",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#dc3545",
                          });
                          if (isConfirmed) {
                            removeBookFromClub(clubId, book.id);
                            Swal.fire({
                              title: "Removed",
                              text: `${book.title} removed from ${club?.name || "club"} shelf.`,
                              icon: "success",
                              confirmButtonColor: "#198754",
                            });
                          }
                        } : undefined,
                        onReadClick: () => {
                          // TODO: Implement book reading functionality
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted">
              No upcoming books in the club's reading list.
            </p>
          )}
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <h3 className="display-6 pb-2">Completed Books</h3>
          <div className="row g-3">
            {completedBooks && completedBooks.length > 0 ? (
              completedBooks.map((clubBook, index) => {
                const book = books?.find((b) => b.id === clubBook.bookId);
                if (!book) return null;
                
                const inPersonalShelf = isInShelf(book.id);
                const canModifyClub = clubId ? isModerator(clubId, userId) : false;

                return (
                  <div key={clubBook.bookId || index} className="col-md-4">
                    <BookCard
                      item={book}
                      actions={{
                        onAdd: !inPersonalShelf ? () => {
                          addBook(book);
                          Swal.fire({
                            title: "Added!",
                            text: `${book.title} added to your shelf.`,
                            icon: "success",
                            confirmButtonColor: "#198754",
                          });
                        } : undefined,
                        onRemove: canModifyClub ? async () => {
                          if (!clubId) return;
                          const { isConfirmed } = await Swal.fire({
                            title: "Remove from Club?",
                            text: `Are you sure you want to remove "${book.title}" from ${club?.name || "the club"}?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, Remove",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#dc3545",
                          });
                          if (isConfirmed) {
                            removeBookFromClub(clubId, book.id);
                            Swal.fire({
                              title: "Removed",
                              text: `${book.title} removed from ${club?.name || "club"} shelf.`,
                              icon: "success",
                              confirmButtonColor: "#198754",
                            });
                          }
                        } : undefined,
                        onReadClick: () => {
                          // TODO: Implement book reading functionality
                        },
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-muted">No completed books yet.</p>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card shadow" style={{ maxWidth: 400, width: "90%" }}>
            <div className="card-body">
              <h5 className="card-title text-danger mb-3">
                <FaTrash className="me-2" />
                Delete Club
              </h5>
              <p className="mb-4">
                Are you sure you want to delete <strong>{club?.name}</strong>?
                This action cannot be undone and will remove all club data
                including discussions and member information.
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteClub}>
                  <FaTrash className="me-1" />
                  Delete Club
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

function BackButton() {
  return (
    <NavLink to="/clubs" className="btn btn-outline-success">
      <FaArrowLeftLong className="me-2" />
      Back to book clubs
    </NavLink>
  );
}

function CurrentBookSection() {
  const { currentUser } = useAuthContext();
  const { clubId } = useParams();
  const { clubs, isModerator, selectCurrentBook, getBookClubProgress, getClubBooks } =
    useClub();
  const { books: allBooks } = useBookData();

  const clubProgress = getBookClubProgress(clubId!);
  const club = clubs.find((c) => c.id === clubId);
  const userId = currentUser?.id;

  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookData | null>(null);

  const clubBooks = getClubBooks(clubId!) || [];
  const availableBooks = clubBooks
    .filter((clubBook) => clubBook.status !== "completed")
    .map((clubBook) => {
      const book = allBooks?.find((b) => b.id === clubBook.bookId);
      return book;
    })
    .filter((book): book is BookData => book !== undefined);

  useEffect(() => {
    if (!club || !allBooks) return;

    const clubCurrent = club.currentBook?.bookId;
    const selected = allBooks.find((b: BookData) => b.id === clubCurrent);

    if (selected) {
      setCurrentBook(selected);
    } else {
      setCurrentBook(null);
    }
  }, [club?.currentBook?.bookId, allBooks]);

  const changeCurrentBook = (bookId: string) => {
    if (!clubId || !userId) return;
    selectCurrentBook(clubId, bookId, userId);
    
    const selected = allBooks?.find((b: BookData) => b.id === bookId);
    if (selected) {
      setCurrentBook(selected);
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="display-6 mb-0">Current Book</h2>
            {isModerator(clubId!, userId!) && 
             club?.currentBook?.status !== "completed" && (
              <div className="d-flex gap-2">
                <div className="input-group" style={{ maxWidth: 360 }}>
                  <label className="input-group-text" htmlFor="currentBookSelect">
                    Select Current Book
                  </label>
                  <select
                    id="currentBookSelect"
                    className="form-select"
                    value={currentBook?.id || ""}
                    onChange={(e) => changeCurrentBook(e.target.value)}
                  >
                    {availableBooks.map((b: BookData) => (
                      <option key={b.id} value={b.id}>
                        {b.title}
                      </option>
                    ))}
                  </select>

                </div>
                  
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-success"
                >
                  <FaPlus className="me-1" />
                  Add Book
                </button>
              </div>
            )}
          </div>

          {currentBook ? (
            <div className="card p-4">
              <div className="row align-items-center">
                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <img
                    src={currentBook.coverImage}
                    alt={currentBook.title}
                    className="shadow img-fluid"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6">
                  <h3 className="h4 mb-2">{currentBook.title}</h3>
                  <p className="text-muted mb-1">{currentBook.author}</p>
                  <p className="text-muted mb-1">
                    Published: {currentBook.publishedYear}
                  </p>
                  <p className="text-muted mb-3">
                    Tags: {currentBook.tags?.join(", ")}
                  </p>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-muted">Reading Progress</span>
                      <span className="small text-muted">{clubProgress}%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${clubProgress ?? 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 text-center">
                  <NavLink
                    to="/discussions"
                    className="btn btn-outline-success mb-2 d-block"
                  >
                    Join Discussions
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-light text-center mt-3">
              No current book selected yet.
            </div>
          )}
        </div>
      </div>
      <RecentDiscussions />

      <BookSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        clubId={clubId}
      />
    </div>
  );
}

function RecentDiscussions() {
  const recentPosts = [
    {
      id: 1,
      title: "Chapter 15 Analysis",
      author: "Sarah M.",
      time: "2 hours ago",
      replies: 8,
    },
    {
      id: 2,
      title: "Character Development Discussion",
      author: "Mike R.",
      time: "5 hours ago",
      replies: 12,
    },
    {
      id: 3,
      title: "Themes and Symbolism",
      author: "Emma L.",
      time: "1 day ago",
      replies: 15,
    },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="display-6 mb-0">Recent Discussions</h2>
          <NavLink to="/discussions" className="btn btn-outline-success">
            View All Discussions
            <MdArrowForward />
          </NavLink>
        </div>

        <div className="row">
          {recentPosts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted small">
                    by {post.author} • {post.time}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">
                      {post.replies} replies
                    </span>
                    <NavLink
                      to={`/discussions/${post.id}`}
                      className="btn btn-sm btn-outline-success"
                    >
                      Join Discussion
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
