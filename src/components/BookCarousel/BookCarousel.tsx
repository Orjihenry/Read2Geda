import Carousel from "../Carousel";
import BookCard from "../BookCard";

import "./BookCarousel.css";
import useRandomBooks from "../../hooks/useOpenLibrary";

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
      renderItem={(item, index) => ( <BookCard key={index} item={item} index={index} />)}
    />
  );
}
