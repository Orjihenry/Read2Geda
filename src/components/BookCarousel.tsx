import Carousel from "./Carousel";
import BookCard from "./BookCard";
import useRandomBooks from "../hooks/useOpenLibrary";

import "../styles/BookCarousel.css";

export default function BookCarouselPage() {

  const { books: randomBooks, loading } = useRandomBooks();

  if (loading) return(
    <>
      <div className="text-center">
        <div className="spinner-border text-primary mb-2" role="status" />
        <p className="lead"> 📚 Please wait, loading your next great read... </p>;
      </div>
    </>
  )

  return (
    <Carousel
      data={randomBooks}
      renderItem={(item, index) => (
        <BookCard
          key={index}
          item={item}
          actions={{}}
        />
      )}
    />
  );
}
