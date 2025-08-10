import { type bookClub } from "../../utils/bookClub";
import {
  MdAddLocationAlt,
  MdCalendarMonth,
  MdPeopleAlt,
  MdStar,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

type clubCardProps = {
  index: number
  item: bookClub
}

export default function ClubCard({ index, item}: clubCardProps ) {
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
    <>
      <div key={index} className="slider-container">
        <div className="px-2">
          <div className="p-3 border rounded shadow-sm bg-light card-custom-wrapper">
            <div className="d-flex text-start align-items-center">
              <div className="flex-shrink-0 me-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-circle me-3"
                  style={{ width: "70px", height: "70px", maxWidth: "70px" }}
                />
              </div>

              <div className="mb-3">
                <h5 className="fw-semibold text-dark" title={item.name}>
                  {item.name}
                </h5>
                <p className="text-muted mb-0 small" title={item.description}>
                  {item.description}
                </p>
              </div>
            </div>
            <div className="small text-secondary">
              <p className="d-flex align-items-center mb-2">
                <span className="me-2 text-muted">
                  <MdAddLocationAlt />
                </span>
                Location:{" "}
                <span className="ms-1">{item.location || "Online"}</span>
              </p>
              <p className="mb-2 small d-flex align-items-center justify-content-start">
                <span className="pe-2 text-muted">
                  <MdPeopleAlt />
                </span>
                Members: <span className="ms-1">{item.members.length}</span>
              </p>
              <div className="mb-2 small d-flex align-items-center justify-content-start">
                <span className="me-2 text-warning">
                  <MdStar />
                </span>
                <span className="me-1">Rating:</span>
                <div className="d-flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < item.rating ? "filled text-warning" : "text-muted"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-2 small d-flex align-items-center justify-content-start">
                <span className="me-2 text-muted">
                  <IoMdPricetag />
                </span>
                Tags:{" "}
                <span className="ms-1">
                  {item.tags?.join(", ") || "None"}
                </span>
              </p>
              <p className="mb-2 small d-flex align-items-center justify-content-start">
                <span className="me-2 text-muted">
                  <MdCalendarMonth />
                </span>
                Next Meeting:{" "}
                <span className="ms-1">
                  {item.nextMeeting
                    ? new Date(item.nextMeeting).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
            </div>
            <div className="d-flex gap-2 pt-2 justify-content-center">
              <NavLink
                to={`/book_club/${item.id}`}
                className="btn btn-dark btn-sm">
                Join Club
              </NavLink>
              <NavLink
                to={`/club/${item.id}`}
                className="btn btn-outline-success btn-sm">
                View Details
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
