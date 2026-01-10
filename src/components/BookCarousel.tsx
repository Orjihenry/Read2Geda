import { useRef } from "react";
import Carousel from "./Carousel";
import BookCard from "./BookCard";
import useRandomBooks from "../hooks/useOpenLibrary";
import { useAuthContext } from "../context/AuthContext";
import { useBookActions } from "../hooks/useBookActions";
import { FaPlus } from "react-icons/fa";
import type { BookData } from "../utils/bookData";

import "../styles/BookCarousel.css";

export default function BookCarouselPage() {
  const { books: randomBooks, loading } = useRandomBooks();
  const { currentUser } = useAuthContext();
  const { handleAddBook } = useBookActions();
  const sliderRef = useRef<any>(null);

  const handleAddBookClick = async (book: BookData) => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
    try {
      await handleAddBook(book);
    } finally {
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    }
  };

  if (loading) return(
    <>
      <div className="text-center">
        <div className="spinner-border text-primary mb-2" role="status" />
        <p className="lead"> 📚 Please wait, loading your next great read... </p>;
      </div>
    </>
  )

  return (
    <>
      <Carousel
        ref={sliderRef}
        data={randomBooks}
        renderItem={(item, index) => {
          const book = item as BookData;
          return (
            <div className="position-relative" key={index}>
              {currentUser && (
                <button
                  className="btn btn-success rounded-circle p-1 d-flex align-items-center justify-content-center position-absolute"
                  type="button"
                  style={{ 
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    fontSize: "1rem",
                    zIndex: 10,
                  }}
                  title="Add book"
                  onClick={() => handleAddBookClick(book)}
                >
                  <FaPlus />
                </button>
              )}
              <BookCard
                item={book}
              />
            </div>
          );
        }}
      />
    </>
  );
}
