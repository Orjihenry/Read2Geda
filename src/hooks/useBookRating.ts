import { useCallback } from "react";
import Swal from "sweetalert2";
import { sweetAlert } from "../alerts/sweetAlert";

type RatingPromptResult = {
  rating: number | null;
  shouldProceed: boolean;
};

export function useBookRatingPrompt() {
  const promptForRating = useCallback(async (title: string): Promise<RatingPromptResult> => {
    const { value, isConfirmed, dismiss } = await sweetAlert.fire({
      title: "Rate this book",
      text: title,
      input: "select",
      inputOptions: {
        5: "5 - Excellent",
        4: "4 - Great",
        3: "3 - Good",
        2: "2 - Fair",
        1: "1 - Poor",
      },
      inputPlaceholder: "Select rating",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Submit Rating",
      cancelButtonText: "Skip",
    });

    if (
      dismiss === Swal.DismissReason.close ||
      dismiss === Swal.DismissReason.esc ||
      dismiss === Swal.DismissReason.backdrop
    ) {
      return { rating: null, shouldProceed: false };
    }

    if (!isConfirmed) {
      return { rating: null, shouldProceed: true };
    }

    if (!value) {
      return { rating: null, shouldProceed: true };
    }

    return { rating: Number(value), shouldProceed: true };
  }, []);

  return { promptForRating };
}
