import { createContext, useContext, useState, useCallback } from "react";
import BookSearchModal from "../components/BookSearchModal";

type BookSearchContextType = {
  openBookSearch: (clubId?: string) => void;
  closeBookSearch: () => void;
};

const BookSearchModalContext = createContext<BookSearchContextType | null>(null);

export function BookSearchModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clubId, setClubId] = useState<string | undefined>();

  const openBookSearch = useCallback((clubIdOptional?: string) => {
    setClubId(clubIdOptional);
    setIsOpen(true);
  }, []);

  const closeBookSearch = useCallback(() => {
    setIsOpen(false);
    setClubId(undefined);
  }, []);

  return (
    <BookSearchModalContext.Provider value={{ openBookSearch, closeBookSearch }}>
      {children}
      {isOpen && (
        <BookSearchModal
          isOpen={isOpen}
          clubId={clubId}
          onClose={closeBookSearch}
        />
      )}
    </BookSearchModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBookSearchModal() {
  const ctx = useContext(BookSearchModalContext);
  if (!ctx) throw new Error("Must wrap app in BookSearchModalProvider");
  return ctx;
}