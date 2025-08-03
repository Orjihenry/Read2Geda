import Carousel from "../Carousel";
import BookCard from "../BookCard";

import "./BookCarousel.css";
import useBookData from "../../hooks/useBookData";

export default function BookCarouselPage() {

  const { books, loading } = useBookData();

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
      data={books}
      renderItem={(item, index) => ( <BookCard key={index} item={item} index={index} />)}
    />
  );
}
