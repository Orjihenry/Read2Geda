import { useCallback, useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useClub } from "../context/ClubContext";
import { useSavedBooks } from "../context/SavedBooksContext";
import type { BookData } from "../utils/bookData";
import Swal from "sweetalert2";

type UseBookActionsProps = {
  clubId?: string;
};

export function useBookActions({ clubId }: UseBookActionsProps = {}) {
  const { currentUser } = useAuthContext();
  const { addBookToClub, removeBookFromClub, isModerator, getClubBooks, getMyClubs, clubs } = useClub();
  const { isInShelf, addBook, removeBook } = useSavedBooks();

  const userId = currentUser?.id || "";

  const clubBooks = useMemo(() => {
    if (!clubId) return new Set<string>();
    return new Set(getClubBooks(clubId).map(b => b.bookId));
  }, [clubId, getClubBooks]);

  const myClubs = useMemo(() => (
    userId ? getMyClubs(userId) : []
  ), [userId, getMyClubs]);

  const moderatorClubs = useMemo(
    () => myClubs.filter(c => isModerator(c.id, userId)),
    [myClubs, isModerator, userId]
  );

  const getClubName = useCallback((targetClubId: string): string => {
    const club = clubs.find(c => c.id === targetClubId);
    return club?.name || "the club";
  }, [clubs]);

  const getBookStatus = useCallback((bookId: string) => ({
    inPersonalShelf: isInShelf(bookId),
    inClubShelf: clubId ? clubBooks.has(bookId) : false,
    canModifyClub: clubId ? isModerator(clubId, userId) : false
  }), [clubId, userId, isInShelf, isModerator, clubBooks]);

  const checkLogin = useCallback((): boolean => {
    if (!userId) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add books.",
        icon: "info",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
      return false;
    }
    return true;
  }, [userId]);

  const showAlreadyInShelf = useCallback((bookTitle: string) => {
    return Swal.fire({
      title: "Already in Shelf",
      html: `<p><span class="font-italic">'${bookTitle}'</span> is already on your shelf.</p>`,
      icon: "info",
      confirmButtonText: "OK",
      showCloseButton: true,
      allowEscapeKey: true,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }, []);

  const showAddedSuccess = useCallback((bookTitle: string, location: string, allowOutsideClick: boolean = true) => {
    return Swal.fire({
      title: "Added!",
      text: `${bookTitle} added to ${location}.`,
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
      allowOutsideClick,
      allowEscapeKey: true,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }, []);

  const handleAddBook = useCallback(async (book: BookData) => {
    if (!checkLogin()) return;

    const { inPersonalShelf, inClubShelf } = getBookStatus(book.id);

    if (moderatorClubs.length > 0) {
      const { value: addToClub, isDismissed } = await Swal.fire({
        title: "Add to where?",
        text: book.title,
        icon: "question",
        showCloseButton: true,
        confirmButtonText: "Club Shelf",
        showDenyButton: true,
        denyButtonText: "My Shelf",
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success",
          denyButton: "btn btn-outline-dark",
        },
      });

      if (isDismissed) return;

      if (!addToClub) {
        if (inPersonalShelf) {
          return showAlreadyInShelf(book.title);
        }
        addBook(book);
        return showAddedSuccess(book.title, "your shelf", false);
      }

      const { value: selectedClubId, isDismissed: isClubSelectionDismissed } = await Swal.fire({
        title: "Select a Club",
        input: "select",
        inputOptions: Object.fromEntries(
          moderatorClubs.map(c => [c.id, c.name])
        ),
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-outline-success",
        },
      });

      if (isClubSelectionDismissed || !selectedClubId) return;

      const selectedClub = moderatorClubs.find(c => c.id === selectedClubId);
      const selectedClubName = selectedClub?.name || "the club";
      
      addBookToClub(selectedClubId, book, userId);
      return showAddedSuccess(book.title, selectedClubName);
    }

    if (clubId) {
      const clubName = getClubName(clubId);
      
      if (!isModerator(clubId, userId)) {
        Swal.fire({
          title: "Permission Denied",
          text: `Only moderators can add books to ${clubName}.`,
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: true,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        return;
      }
      if (inClubShelf) {
        Swal.fire({
          title: "Already Added",
          text: `${book.title} is already in ${clubName}.`,
          icon: "info",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: true,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        return;
      }

      addBookToClub(clubId, book, userId);
      return showAddedSuccess(book.title, clubName, false);
    }

    if (inPersonalShelf) {
      return showAlreadyInShelf(book.title);
    }

    addBook(book);
    showAddedSuccess(book.title, "your shelf");
  }, [userId, clubId, getBookStatus, addBook, addBookToClub, moderatorClubs, isModerator, getClubName, checkLogin, showAlreadyInShelf, showAddedSuccess]);

  const handleRemoveBook = useCallback(async (book: BookData) => {
    if (!clubId || !userId) return;

    const clubName = getClubName(clubId);

    const { isConfirmed, isDismissed } = await Swal.fire({
      title: "Remove book?",
      html: `Remove <span class="font-italic">'${book.title}'</span> from <strong>${clubName}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      allowEscapeKey: true,
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger",
      },
    });

    if (isDismissed) return;

    if (isConfirmed) {
      removeBookFromClub(clubId, book.id);
      Swal.fire({
        title: "Removed!",
        text: `${book.title} removed from ${clubName}.`,
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  }, [clubId, userId, removeBookFromClub, getClubName]);

  const handleAddToPersonalShelf = useCallback(async (book: BookData) => {
    if (!checkLogin()) return;

    if (isInShelf(book.id)) {
      return showAlreadyInShelf(book.title);
    }

    addBook(book);
    showAddedSuccess(book.title, "your shelf");
  }, [checkLogin, isInShelf, addBook, showAlreadyInShelf, showAddedSuccess]);

  const handleRemoveFromPersonalShelf = useCallback(async (book: BookData) => {
    if (!userId) return;

    const { isConfirmed, isDismissed } = await Swal.fire({
      title: "Remove from Shelf?",
      html: `Are you sure you want to remove <span class="font-italic">'${book.title}'</span>?`,
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      allowEscapeKey: true,
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger",
      },
    });

    if (isDismissed) return;

    if (isConfirmed) {
      removeBook(book.id);
      Swal.fire({
        title: "Removed",
        text: `${book.title} removed.`,
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowEscapeKey: true,
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  }, [userId, removeBook]);

  return {
    handleAddBook,
    handleRemoveBook,
    handleAddToPersonalShelf,
    handleRemoveFromPersonalShelf,
    getBookStatus
  };
}