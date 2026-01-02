import { NavLink, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JoinClubButton from "../components/JoinClubButton";
import { FaBookOpen, FaCrown, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { MdPeopleAlt, MdShield, MdSearch, MdExpandMore, MdExpandLess, MdSettings, MdChatBubble, MdOutlineFavorite } from "react-icons/md";
import { useEffect, useState } from "react";
import type { BookData } from "../utils/bookData";
import { useClub } from "../context/ClubContext";
import { useFetchImage } from "../hooks/useFetchImage";
import placeholderClubImage from "../assets/bookClub.jpg";
import { useAuthContext } from "../context/AuthContext";
import useBookData from "../hooks/useBookData";
import type { ClubBook, ClubRule } from "../utils/bookClub";
import { getClubRules } from "../utils/clubRules";
import BookCard, { type BookCardActions } from "../components/BookCard";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookSearchModal } from "../context/BookSearchModalContext";
import { useBookCache } from "../context/BookCacheContext";
import useSearchFilter from "../hooks/useSearchFilter";
import Button from "../components/Button";
import Swal from "sweetalert2";
import "../styles/ClubDetails.css";

export default function ClubDetails() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { openBookSearch } = useBookSearchModal();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const { clubs, deleteClub, getClubBooks, removeBookFromClub, isModerator, updateClubRules, addRule, removeRule, updateRule } = useClub();
  const [upcomingBooks, setUpcomingBooks] = useState<ClubBook[]>([]);
  const [completedBooks, setCompletedBooks] = useState<ClubBook[]>([]);
  const { books } = useBookCache();
  const { currentUser } = useAuthContext();
  const { isInShelf, addBook, getUserBookProgress, updateProgress } = useSavedBooks();
  const userId = currentUser?.id || "";
  const club = clubs.find((c) => c.id === clubId);
  
  const [editingRules, setEditingRules] = useState<ClubRule[]>([]);
  
  const canModifyRules = clubId ? isModerator(clubId, userId) : false;
  
  const handleOpenRulesModal = () => {
    if (club) {
      setEditingRules(club.rules && club.rules.length > 0 
        ? [...club.rules] 
        : getClubRules(club.name));
      setShowRulesModal(true);
    }
  };
  
  const handleSaveRules = () => {
    if (!clubId) return;
    
    const success = updateClubRules(clubId, editingRules);
    
    if (success) {
      setShowRulesModal(false);
      Swal.fire({
        title: "Rules Updated!",
        text: "Club rules have been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to update club rules. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    }
  };
  
  const handleAddRule = () => {
    setEditingRules(addRule(editingRules));
  };
  
  const handleRemoveRule = (index: number) => {
    setEditingRules(removeRule(editingRules, index));
  };
  
  const handleUpdateRule = (index: number, field: "title" | "description", value: string) => {
    setEditingRules(updateRule(editingRules, index, field, value));
  };
  
  const { imageUrl, loading } = useFetchImage(club?.imageUrl, placeholderClubImage);
  
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

  const seeMembers = () => {
    const clubMembersSection = document.getElementById("clubMembersSection");
    if (clubMembersSection) {
      clubMembersSection.scrollIntoView({ behavior: "smooth" });
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
            <div className="ms-3">
              <div className="dropdown">
                <button
                  className="btn btn-outline-success btn-sm dropdown-toggle"
                  type="button"
                  id="clubSettingsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title="Club Settings"
                >
                  <MdSettings className="me-1" />
                  Settings
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="clubSettingsDropdown">
                {isModerator(clubId!, userId!) && (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleUpdateClub}
                      >
                        <FaEdit className="me-2" />
                        Update Club
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>
                )}
                {isModerator(clubId!, userId!) && (
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <FaTrash className="me-2" />
                      Delete Club
                    </button>
                  </li>
                )}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={seeMembers}
                  >
                    <MdPeopleAlt className="me-2" />
                    See Members
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => console.log("See Discussions")}
                  >
                    <MdChatBubble className="me-2" />
                    See Discussions
                  </button>
                </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 pt-2 justify-content-start">
            <JoinClubButton clubId={clubId} />
            {isModerator(clubId!, userId!) && (
              <Button
                label="Add a Book"
                onClick={() => openBookSearch(clubId)}
                className="btn btn-outline-success"
                >
                Add a Book
              </Button>
            )}
          </div>
        </div>

        <ClubMembersSection />
      </div>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="container py-5">
            <CurrentBookSection />
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="display-6 py-2 mb-0">Club Rules</h2>
          {canModifyRules && (
            <button 
              className="btn btn-success btn-md"
              onClick={handleOpenRulesModal}
            >
              <FaEdit className="me-1" />
              Update Rules
            </button>
          )}
        </div>

        <div className="py-4">
          {(club?.rules && club.rules.length > 0 ? club.rules : getClubRules(club?.name || "")).map((rule, index) => (
            <div key={index} className="mb-3">
              <span className="fw-semibold fs-5 mb-2">
                <FaBookOpen className="me-2" />
                {rule.title}:&nbsp;
              </span>
              <span className="text-muted mb-0">{rule.description}</span>
            </div>
          ))}
        </div>
      </div>

      {showRulesModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setShowRulesModal(false)}
        >
          <div 
            className="card shadow" 
            style={{ maxWidth: "700px", width: "90%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header bg-success text-white">
              <h5 className="card-title mb-0">Edit Club Rules</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                {editingRules.map((rule, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="text-muted mb-0">Rule {index + 1}</h6>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveRule(index)}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={rule.title}
                          onChange={(e) => handleUpdateRule(index, "title", e.target.value)}
                          placeholder="Rule title"
                        />
                      </div>
                      <div>
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={rule.description}
                          onChange={(e) => handleUpdateRule(index, "description", e.target.value)}
                          placeholder="Rule description"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                className="btn btn-outline-success mb-3"
                onClick={handleAddRule}
                disabled={editingRules.length >= 7}
                title={editingRules.length >= 7 ? "Maximum of 7 rules allowed" : ""}
              >
                <FaPlus className="me-1" />
                Add Rule {editingRules.length >= 7 && <span className="text-muted">(Limit: 7)</span>}
              </button>
              
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowRulesModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSaveRules}
                  disabled={editingRules.some(r => !r.title.trim() || !r.description.trim())}
                >
                  Save Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-light py-5">
        <div className="container py-4">
          <h3 className="display-6 pb-2">Other Books On Our List</h3>
          {upcomingBooks.length > 0 ? (
            <div className="row g-3">
              {upcomingBooks.map((clubBook, index) => {
                const book = books.get(clubBook.bookId);
                if (!book) return null;

                const inPersonalShelf = isInShelf(book.id);
                const canModifyClub = clubId ? isModerator(clubId, userId) : false;

                const actions: BookCardActions[] = [];
                
                if (canModifyClub) {
                  actions.push({
                    key: "remove",
                    label: "Remove",
                    icon: <IoMdClose className="me-1" />,
                    className: "btn btn-outline-danger flex-fill",
                    title: "Remove from club",
                    onClick: async () => {
                      if (!clubId) return;
                      const { isConfirmed } = await Swal.fire({
                        title: "Remove from Club?",
                        text: `Are you sure you want to remove "${book.title}" from ${club?.name || "the club"}?`,
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
                        removeBookFromClub(clubId, book.id);
                        Swal.fire({
                          title: "Removed",
                          text: `${book.title} removed from ${club?.name || "club"} shelf.`,
                          icon: "success",
                          confirmButtonText: "OK",
                          customClass: {
                            confirmButton: "btn btn-success",
                          },
                        });
                      }
                    },
                  });
                }
                
                if (!inPersonalShelf) {
                  actions.push({
                    key: "add",
                    label: "Add",
                    icon: <MdOutlineFavorite className="me-1" />,
                    className: actions.length > 0 ? "btn btn-outline-success flex-fill" : "btn btn-outline-success w-100",
                    title: "Add to shelf",
                    onClick: () => {
                      addBook(book);
                      Swal.fire({
                        title: "Added!",
                        text: `${book.title} added to your shelf.`,
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                          confirmButton: "btn btn-success",
                        },
                      });
                    },
                  });
                }

                return (
                  <div key={clubBook.bookId || index} className="col-md-4">
                    <BookCard
                      item={book}
                      actions={actions}
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
                const book = books.get(clubBook.bookId);
                if (!book) return null;
                
                const inPersonalShelf = isInShelf(book.id);
                const canModifyClub = clubId ? isModerator(clubId, userId) : false;
                const progress = getUserBookProgress(book.id);

                const actions: BookCardActions[] = [];
                
                if (canModifyClub) {
                  actions.push({
                    key: "remove",
                    label: "Remove",
                    icon: <IoMdClose className="me-1" />,
                    className: "btn btn-outline-danger flex-fill",
                    title: "Remove from club",
                    onClick: async () => {
                      if (!clubId) return;
                      const { isConfirmed } = await Swal.fire({
                        title: "Remove from Club?",
                        text: `Are you sure you want to remove "${book.title}" from ${club?.name || "the club"}?`,
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
                        removeBookFromClub(clubId, book.id);
                        Swal.fire({
                          title: "Removed",
                          text: `${book.title} removed from ${club?.name || "club"} shelf.`,
                          icon: "success",
                          confirmButtonText: "OK",
                          customClass: {
                            confirmButton: "btn btn-success",
                          },
                        });
                      }
                    },
                  });
                }
                
                if (!inPersonalShelf) {
                  actions.push({
                    key: "add",
                    label: "Add",
                    icon: <MdOutlineFavorite className="me-1" />,
                    className: actions.length > 0 ? "btn btn-outline-success flex-fill" : "btn btn-outline-success w-100",
                    title: "Add to shelf",
                    onClick: () => {
                      addBook(book);
                      Swal.fire({
                        title: "Added!",
                        text: `${book.title} added to your shelf.`,
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                          confirmButton: "btn btn-success",
                        },
                      });
                    },
                  });
                }

                return (
                  <div key={clubBook.bookId || index} className="col-md-4">
                    <BookCard
                      item={book}
                      actions={actions}
                      progress={progress}
                      showProgress={inPersonalShelf}
                      onProgressChange={inPersonalShelf ? (newProgress) => updateProgress(book.id, newProgress) : undefined}
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
                  className="btn btn-outline-success"
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

function ClubMembersSection() {
  const { clubId } = useParams();
  const { clubs } = useClub();
  const { users } = useAuthContext();
  const { getUserBookProgressById } = useClub();
  const club = clubs.find((c) => c.id === clubId);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 6;

  const currentBookId = club?.currentBook?.bookId;

  const clubMembers = club?.members?.length
    ? club.members.map((member) => {
        const user = users?.find((u) => u.id === member.id);
        return {
          ...member,
          name: user?.name || "Unknown User",
          email: user?.email || "",
          avatar: user?.avatar,
        };
      })
    : [];

  const { filteredData: filteredMembers, searchInput: searchQuery, setSearchInput: setSearchQuery } = useSearchFilter(clubMembers);

  if (!club || !club.members || club.members.length === 0) {
    return null;
  }

  const showAllButtons = () => {
    setShowAll(!showAll);
    setSearchQuery("");
  }

  const owners = filteredMembers.filter((m) => m.role === "owner");
  const moderators = filteredMembers.filter((m) => m.role === "moderator");
  const members = filteredMembers.filter((m) => m.role === "member" || !m.role);

  const allMembers = [...owners, ...moderators, ...members];
  
  const displayCount = showAll ? allMembers.length : Math.min(INITIAL_DISPLAY_COUNT, allMembers.length);
  const membersToShow = allMembers.slice(0, displayCount);
  const hasMore = allMembers.length > INITIAL_DISPLAY_COUNT;

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
        return <span className="badge bg-secondary">Member</span>;
    }
  };

  const getAvatarColor = (role?: string) => {
    switch (role) {
      case "owner":
        return "bg-warning text-dark";
      case "moderator":
        return "bg-info text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="mt-4" id="clubMembersSection">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 d-flex align-items-center">
              <MdPeopleAlt className="me-2" />
              Club Members ({club.members.length})
            </h5>
            {club.members.length > INITIAL_DISPLAY_COUNT && (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={showAllButtons}
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
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <small className="text-muted">
                {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} found
              </small>
            )}
          </div>
          {filteredMembers.length === 0 ? (
            <p className="text-muted text-center py-3">No members found matching your search.</p>
          ) : (
            <>
              <div className="row g-2">
                {membersToShow.map((member) => {
                  const memberProgress = currentBookId 
                    ? getUserBookProgressById(member.id, currentBookId) : 0;
                  
                    return (
                      <div key={member.id} className="col-md-6 col-lg-4">
                      <NavLink 
                        to={`/user/${member.id}`} 
                        className="text-decoration-none h-100 d-block"
                      >
                        <div className="d-flex flex-column p-2 border rounded h-100 member-card-hover">
                          <div className="d-flex align-items-center mb-2">
                            <div
                              className={`rounded-circle ${getAvatarColor(member.role)} d-flex align-items-center justify-content-center me-3 flex-shrink-0`}
                              style={{ width: "40px", height: "40px", fontSize: "14px" }}
                            >
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-grow-1 min-w-0">
                              <div className="fw-semibold small text-truncate" title={member.name}>
                                {member.name}
                              </div>
                              <div className="small">{getRoleBadge(member.role)}</div>
                            </div>
                          </div>
                          {currentBookId && (
                            <div className="mt-2">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="small text-muted">Current Book Progress</span>
                                <span className="small text-muted fw-semibold">{memberProgress}%</span>
                              </div>
                              <div className="progress" style={{ height: "6px" }}>
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: `${memberProgress}%` }}
                                  aria-valuenow={memberProgress}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
              </div>

              {hasMore && !showAll && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => setShowAll(true)}
                  >
                    <MdExpandMore className="me-1" />
                    Show {allMembers.length - INITIAL_DISPLAY_COUNT} More Members
                  </button>
                </div>
              )}

              {showAll && hasMore && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-success btn-sm"
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
  );
}

function CurrentBookSection() {
  const { currentUser } = useAuthContext();
  const { clubId } = useParams();
  const { openBookSearch } = useBookSearchModal();
  const { clubs, isModerator, selectCurrentBook, getBookClubProgress, getClubBooks } =
    useClub();
  const { books: allBooks } = useBookData();

  const clubProgress = getBookClubProgress(clubId!);
  const club = clubs.find((c) => c.id === clubId);
  const userId = currentUser?.id;

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
  }, [club?.currentBook?.bookId, allBooks, club]);

  const changeCurrentBook = (bookId: string) => {
    if (!clubId || !userId) return;
    selectCurrentBook(clubId, bookId, userId);
    
    const selected = allBooks?.find((b: BookData) => b.id === bookId);
    if (selected) {
      setCurrentBook(selected);
    }
  };

  return (
    <div className="bg-light">
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
                  onClick={() => openBookSearch(clubId)}
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
      {/* <RecentDiscussions /> */}
    </div>
  );
}

// function RecentDiscussions() {
//   const recentPosts = [
//     {
//       id: 1,
//       title: "Chapter 15 Analysis",
//       author: "Sarah M.",
//       time: "2 hours ago",
//       replies: 8,
//     },
//     {
//       id: 2,
//       title: "Character Development Discussion",
//       author: "Mike R.",
//       time: "5 hours ago",
//       replies: 12,
//     },
//     {
//       id: 3,
//       title: "Themes and Symbolism",
//       author: "Emma L.",
//       time: "1 day ago",
//       replies: 15,
//     },
//   ];

//   return (
//     <div className="row">
//       <div className="col-12">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="display-6 mb-0">Recent Discussions</h2>
//           <NavLink to="/discussions" className="btn btn-outline-success">
//             View All Discussions
//             <MdArrowForward />
//           </NavLink>
//         </div>

//         <div className="row">
//           {recentPosts.map((post) => (
//             <div key={post.id} className="col-md-4 mb-3">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{post.title}</h5>
//                   <p className="card-text text-muted small">
//                     by {post.author} • {post.time}
//                   </p>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="badge bg-secondary">
//                       {post.replies} replies
//                     </span>
//                     <NavLink
//                       to={`/discussions/${post.id}`}
//                       className="btn btn-sm btn-outline-success"
//                     >
//                       Join Discussion
//                     </NavLink>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
