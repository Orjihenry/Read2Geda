import { useCallback } from "react";
import { sweetAlert } from "../alerts/sweetAlert";

export function useBookRatingPrompt() {
  const promptForRating = useCallback(async (title: string): Promise<number | null> => {
    const { value, isConfirmed } = await sweetAlert.fire({
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
      showCancelButton: true,
      confirmButtonText: "Submit Rating",
      cancelButtonText: "Skip",
    });

    if (!isConfirmed || !value) return null;
    return Number(value);
  }, []);

  return { promptForRating };
}
