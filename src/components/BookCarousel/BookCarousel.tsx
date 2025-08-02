import { bookData } from "../../utils/bookData";

import Carousel from "../Carousel";
import BookCard from "../BookCard";

import "./BookCarousel.css";

export default function BookCarouselPage() {
  return (
    <Carousel
      data={bookData}
      renderItem={(item, index) => ( <BookCard key={index} item={item} index={index} />)}
    />
  );
}
