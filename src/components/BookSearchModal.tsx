import { useState, useCallback } from "react";
import Modal from "./Modal";
import BookCard from "./BookCard";
import useSearchBooks from "../hooks/useSearchBooks";
import useRandomBooks from "../hooks/useOpenLibrary";
import { useAuthContext } from "../context/AuthContext";
import { useClub } from "../context/ClubContext";
import { useSavedBooks } from "../context/SavedBooksContext";
import Swal from "sweetalert2";

type BookSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clubId?: string;
};

export default function BookSearchModal({ isOpen, onClose, clubId }: BookSearchModalProps) {
  const [query, setQuery] = useState("");
  const { books: randomBooks } = useRandomBooks();
  const [hasSearched, setHasSearched] = useState(false);
  const { books: searchResults, loading: searchLoading, search } = useSearchBooks();
  const { currentUser } = useAuthContext();
  const { addBookToClub, removeBookFromClub, isModerator, getClubBooks, getMyClubs } = useClub();
  const { isInShelf, addBook } = useSavedBooks();
  const userId = currentUser?.id || "";

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      setHasSearched(false);
      return;
    }
    setHasSearched(true);
    search(query);
  }, [query, search]);

  const handleClose = () => {
    setQuery("");
    setHasSearched(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🔎 Search for Books" maxWidth="1000px" showFooter={false}
    >
      <div>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for books by title, author, or ISBN..."
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        <div
          className="border rounded p-3"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {hasSearched ? (
            searchLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-2" role="status" />
                <p className="lead text-muted">Searching for books...</p>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="row g-3">
                {searchResults.map((item, index) => {
                  const inPersonalShelf = isInShelf(item.id);
                  const inClubShelf = clubId ? getClubBooks(clubId).some((clubBook) => clubBook.bookId === item.id) : false;
                  const canModifyClub = clubId ? isModerator(clubId, userId) : false;
                  const myClubs = userId ? getMyClubs(userId) : [];
                  const moderatorClubs = myClubs.filter((club) => isModerator(club.id, userId));

                  const handleAddBook = async () => {
                    if (!userId) {
                      Swal.fire({
                        title: "Login Required",
                        text: "Please log in to add books.", 
                        icon: "info",
                        confirmButtonColor: "#198754",
                      });
                      return;
                    }

                    if (clubId) {
                      if (!isModerator(clubId, userId)) {
                        Swal.fire({
                          title: "Permission Denied",
                          text: "Only moderators can add books to the club shelf.", 
                          icon: "error",
                          confirmButtonColor: "#dc3545",
                        });
                        return;
                      }
                      if (inClubShelf) {
                        Swal.fire({
                          title: "Already Added",
                          text: `${item.title} is already in this club's shelf.`, 
                          icon: "info",
                          confirmButtonColor: "#198754",
                        });
                        return;
                      }
                      addBookToClub(clubId, item.id, userId);
                      const club = myClubs.find((c) => c.id === clubId);
                      Swal.fire({
                        title: "Added!",
                        text: `${item.title} added to ${club?.name || "the club"}.`, 
                        icon: "success",
                        confirmButtonColor: "#198754",
                      });
                      return;
                    }

                    if (moderatorClubs.length > 0) {
                      const { value: choice } = await Swal.fire({
                        title: "Add to where?",
                        text: `${item.title}`,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Club Shelf",
                        cancelButtonText: "My Shelf",
                        reverseButtons: true,
                        confirmButtonColor: "#198754",
                        cancelButtonColor: "#6c757d",
                      });

                      if (choice) {
                        if (moderatorClubs.length === 1) {
                          addBookToClub(moderatorClubs[0].id, item.id, userId);
                          Swal.fire({
                            title: "Added!",
                            text: `${item.title} added to ${moderatorClubs[0].name}.`, 
                            icon: "success",
                            confirmButtonColor: "#198754",
                          });
                        } else {
                          const { value: selectedClubId } = await Swal.fire({
                            title: "Select a Club",
                            input: "select",
                            inputOptions: moderatorClubs.reduce((opt, c) => ({ ...opt, [c.id]: c.name }), {}),
                            inputPlaceholder: "Choose a club",
                            showCancelButton: true,
                            confirmButtonText: "Add",
                            confirmButtonColor: "#198754",
                            inputValidator: (value) => (!value ? "You must select a club" : undefined),
                          });
                          if (selectedClubId) {
                            addBookToClub(selectedClubId, item.id, userId);
                            const targetClub = moderatorClubs.find((c) => c.id === selectedClubId);
                            Swal.fire({
                              title: "Added!",
                              text: `${item.title} added to ${targetClub?.name}.`, 
                              icon: "success",
                              confirmButtonColor: "#198754",
                            });
                          }
                        }
                        return;
                      }
                    }

                    if (inPersonalShelf) {
                      Swal.fire("Already in Shelf", `${item.title} is already on your shelf.`, "info");
                      return;
                    }
                    addBook(item);
                    Swal.fire({
                      title: "Added!",
                      text: `${item.title} added to your shelf.`, 
                      icon: "success",
                      confirmButtonColor: "#198754",
                    });
                  };

                  return (
                    <div key={item.id || index} className="col-md-6">
                      <BookCard
                        item={item}
                        hideProgress={true}
                        actions={{
                          onAdd: handleAddBook,
                          onRemove: clubId && inClubShelf && canModifyClub ? async () => {
                            const club = myClubs.find((c) => c.id === clubId);
                            const { isConfirmed } = await Swal.fire({
                              title: "Remove from Club?",
                              text: `Are you sure you want to remove "${item.title}" from ${club?.name || "the club"}?`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, Remove",
                              cancelButtonText: "Cancel",
                              confirmButtonColor: "#dc3545",
                            });
                            if (isConfirmed) {
                              removeBookFromClub(clubId, item.id);
                              Swal.fire({
                                title: "Removed",
                                text: `${item.title} removed from ${club?.name || "club"} shelf.`, 
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
            ) : randomBooks && randomBooks.length > 0 ? (
              randomBooks.map((item, index) => {
                const inPersonalShelf = isInShelf(item.id);
                const inClubShelf = clubId ? getClubBooks(clubId).some((clubBook) => clubBook.bookId === item.id) : false;
                const canModifyClub = clubId ? isModerator(clubId, userId) : false;
                const myClubs = userId ? getMyClubs(userId) : [];
                const moderatorClubs = myClubs.filter((club) => isModerator(club.id, userId));

                const handleAddBook = async () => {
                  if (!userId) {
                    Swal.fire({
                      title: "Login Required",
                      text: "Please log in to add books.", 
                      icon: "info",
                      confirmButtonColor: "#198754",
                    });
                    return;
                  }

                  if (clubId) {
                    if (!isModerator(clubId, userId)) {
                      Swal.fire({
                        title: "Permission Denied",
                        text: "Only moderators can add books to the club shelf.", 
                        icon: "error",
                        confirmButtonColor: "#dc3545",
                      });
                      return;
                    }
                    if (inClubShelf) {
                      Swal.fire({
                        title: "Already Added",
                        text: `${item.title} is already in this club's shelf.`, 
                        icon: "info",
                        confirmButtonColor: "#198754",
                      });
                      return;
                    }
                    addBookToClub(clubId, item.id, userId);
                    const club = myClubs.find((c) => c.id === clubId);
                    Swal.fire({
                      title: "Added!",
                      text: `${item.title} added to ${club?.name || "the club"}.`, 
                      icon: "success",
                      confirmButtonColor: "#198754",
                    });
                    return;
                  }

                  if (moderatorClubs.length > 0) {
                    const { value: choice } = await Swal.fire({
                      title: "Add to where?",
                      text: `${item.title}`,
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Club Shelf",
                      cancelButtonText: "My Shelf",
                      reverseButtons: true,
                      confirmButtonColor: "#198754",
                      cancelButtonColor: "#6c757d",
                    });

                    if (choice) {
                      if (moderatorClubs.length === 1) {
                        addBookToClub(moderatorClubs[0].id, item.id, userId);
                        Swal.fire({
                          title: "Added!",
                          text: `${item.title} added to ${moderatorClubs[0].name}.`, 
                          icon: "success",
                          confirmButtonColor: "#198754",
                        });
                      } else {
                        const { value: selectedClubId } = await Swal.fire({
                          title: "Select a Club",
                          input: "select",
                          inputOptions: moderatorClubs.reduce((opt, c) => ({ ...opt, [c.id]: c.name }), {}),
                          inputPlaceholder: "Choose a club",
                          showCancelButton: true,
                          confirmButtonText: "Add",
                          inputValidator: (value) => (!value ? "You must select a club" : undefined),
                        });
                        if (selectedClubId) {
                          addBookToClub(selectedClubId, item.id, userId);
                          const targetClub = moderatorClubs.find((c) => c.id === selectedClubId);
                          Swal.fire({
                            title: "Added!",
                            text: `${item.title} added to ${targetClub?.name}.`, 
                            icon: "success",
                            confirmButtonColor: "#198754",
                          });
                        }
                      }
                      return;
                    }
                  }

                  if (inPersonalShelf) {
                    Swal.fire({
                      title: "Already in Shelf",
                      text: `${item.title} is already on your shelf.`, 
                      icon: "info",
                      confirmButtonColor: "#198754",
                    });
                    return;
                  }
                  addBook(item);
                  Swal.fire({
                    title: "Added!",
                    text: `${item.title} added to your shelf.`, 
                    icon: "success",
                    confirmButtonColor: "#198754",
                  });
                };

                return (
                  <div key={item.id || index} className="col-md-4">
                    <BookCard
                      item={item}
                      hideProgress={true}
                      actions={{
                        onAdd: handleAddBook,
                        onRemove: clubId && inClubShelf && canModifyClub ? async () => {
                          const club = myClubs.find((c) => c.id === clubId);
                          const { isConfirmed } = await Swal.fire({
                            title: "Remove from Club?",
                            text: `Are you sure you want to remove "${item.title}" from ${club?.name || "the club"}?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, Remove",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#dc3545",
                          });
                          if (isConfirmed) {
                            removeBookFromClub(clubId, item.id);
                            Swal.fire({
                              title: "Removed",
                              text: `${item.title} removed from ${club?.name || "club"} shelf.`, 
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
              <div className="text-center py-5">
                <p className="lead text-muted">
                  No books found. Try another search query.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">
                Enter a book title, author name, or ISBN to start searching.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
