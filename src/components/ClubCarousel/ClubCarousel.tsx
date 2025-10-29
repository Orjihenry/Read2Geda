import { useEffect, useRef, useState } from "react";
import Carousel from "../Carousel";
import ClubCard from "../ClubCard";
import { useClub } from "../../context/ClubContext";
import "./ClubCarousel.css";

export default function ClubCarousel() {
  const { clubs, loading } = useClub();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && clubs.length > 0) {
      const heights = cardRefs.current.map((card) => card?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }
  }, [loading, clubs]);

  return (
    <div>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="lead text-muted">📚 Please wait, loading your next great read...</p>
        </div>
      ) : (
        <Carousel
          data={clubs}
          renderItem={(item, index) => (
            <div
              ref={(el) => { cardRefs.current[index] = el; }}
              key={item.id || index}
              style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
            >
              <ClubCard item={item} index={index} />
            </div>
          )}
        />
      )}
    </div>
  );
}