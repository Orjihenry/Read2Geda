import { defaultBookClubs } from "../../utils/bookClub";
import { useEffect } from "react";

import Carousel from "../Carousel";
import ClubCard from "../ClubCard";

import "./ClubCarousel.css";

export default function ClubCarousel() {
  useEffect(() => {
    const cards = document.querySelectorAll(".card-custom-wrapper");
    let maxHeight = 0;

    cards.forEach((card) => {
      const h = card.getBoundingClientRect().height;
      if (h > maxHeight) maxHeight = h;
    });

    cards.forEach((card) => {
      (card as HTMLElement).style.height = `${maxHeight}px`;
    });
  }, []);

  return (
    <Carousel
      data={defaultBookClubs}
      renderItem={(item, index) => ( <ClubCard key={index} item={item} index={index} /> )}
    />
  );
}
