import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle, MdPlayArrow, MdRefresh } from "react-icons/md";
import { confirmAlert, notifyAlert } from "../alerts/sweetAlert";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useBookRatingPrompt } from "./useBookRating";
import type { BookCardActions } from "../components/BookCard";
import type { BookData } from "../utils/bookData";

export function useShelfHandlers() {
  const { removeBook, updateProgress } = useSavedBooks();
  const { promptForRating } = useBookRatingPrompt();

  const handleStartReading = useCallback((book: BookData) => {
    updateProgress(book.id, 1);
  }, [updateProgress]);

  const handleMarkAsCompleted = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Mark as Completed?",
      text: `"${book.title}" will be moved to your completed books section.`,
      icon: "question",
      confirmText: "Yes, Mark as Completed",
      cancelText: "Cancel",
    });

    if (isConfirmed) {
      const { rating, shouldProceed } = await promptForRating(book.title);
      if (!shouldProceed) return;

      updateProgress(book.id, 100, rating ?? undefined);

      notifyAlert({
        title: "Completed!",
        text: `"${book.title}" has been marked as completed.`,
        icon: "success",
        options: {
          timer: 2000,
          showConfirmButton: true,
        },
      });
    }
  }, [updateProgress, promptForRating]);

  const handleResetProgress = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Reset Progress?",
      text: "Started and Completed metadata will be lost.",
      icon: "question",
      confirmText: "Yes, Reset",
      cancelText: "Cancel",
    });

    if (isConfirmed) {
      updateProgress(book.id, 0, undefined);
      notifyAlert({
        title: "Reset!",
        text: `Progress for "${book.title}" has been reset.`,
        icon: "success",
        options: {
          timer: 2000,
          showConfirmButton: true,
        },
      });
    }
  }, [updateProgress]);

  const handleRemoveBook = useCallback(async (book: BookData) => {
    const { isConfirmed } = await confirmAlert({
      title: "Remove from Shelf?",
      text: `Are you sure you want to remove "${book.title}"?`,
      icon: "warning",
      confirmText: "Yes, Remove",
      cancelText: "Cancel",
    });
  
    if (isConfirmed) {
      removeBook(book.id);
      notifyAlert({
        title: "Removed",
        text: `${book.title} removed.`,
        icon: "success",
      });
    }
  }, [removeBook]);

  const shelfBooksActions = useCallback((item: BookData, progress: number): BookCardActions[] => {
    const started = progress > 0;

    return [
      {
        key: "read",
        label: started ? "Mark as Completed" : "Start Reading",
        icon: started ? (
          <MdCheckCircle className="me-1" />
        ) : (
          <MdPlayArrow className="me-1" />
        ),
        className: started ? "btn btn-outline-success flex-fill" : "btn btn-success flex-fill",
        onClick: () => {
          if (started) {
            handleMarkAsCompleted(item);
          } else {
            handleStartReading(item);
          }
        },
      },
      {
        key: "remove",
        title: "Remove",
        icon: <IoMdClose className="me-1" />,
        className: "btn btn-outline-danger",
        onClick: () => handleRemoveBook(item),
      }
    ];
  }, [handleMarkAsCompleted, handleStartReading, handleRemoveBook]);

  const completedBooksActions = useCallback((item: BookData): BookCardActions[] => [
    {
      key: "reset",
      label: "Reset Progress",
      icon: <MdRefresh className="me-1" />,
      className: "btn btn-outline-success flex-fill",
      onClick: () => handleResetProgress(item),
    },
    {
      key: "remove",
      title: "Remove",
      icon: <IoMdClose className="me-1" />,
      className: "btn btn-outline-danger",
      onClick: () => handleRemoveBook(item),
    }
  ], [handleResetProgress, handleRemoveBook]);

  return {
    shelfBooksActions,
    completedBooksActions,
  };
}
