import { MdPeopleAlt, MdStar, MdVisibility } from "react-icons/md";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import type { bookClub } from "../utils/bookClub";
import { useFetchImage } from "../hooks/useFetchImage";
import JoinClubButton from "./JoinClubButton";
import placeholderClubImage from "../assets/bookClub.jpg";

type clubCardProps = {
  index: number;
  item: bookClub;
};

export default function ClubCard({ index, item }: clubCardProps) {
  const { imageUrl } = useFetchImage(item.imageUrl, placeholderClubImage);
  
  return (
    <>
      <div key={index} className="col-lg-12 col-md-12">
        <div className="card h-100 border-0 shadow-sm hover-lift d-flex flex-column">
          <div className="card-body p-4">
            <div className="d-flex align-items-start mb-3">
              <div className="flex-shrink-0 me-3">
                <img
                  src={imageUrl || placeholderClubImage}
                  alt={item.name}
                  className="rounded-3 me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    maxWidth: "60px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="flex-grow-1">
                <h6 className="card-title mb-1 fw-bold">{item.name}</h6>
                <p
                  className="text-muted small mb-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </p>
                <div className="d-flex align-items-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Members</Tooltip>}
                  >
                    <span>
                      <MdPeopleAlt />
                      <span className="badge bg-light text-dark">
                        {item.members.length}
                      </span>
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Rating</Tooltip>}
                  >
                    <span className="ms-3">
                      <MdStar />
                      <span className="badge bg-warning text-dark">
                        {item.rating}
                      </span>
                    </span>
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div className="mb-3 small flex-grow-1">
              <div className="row g-2 text-center">
                <div className="col-4">
                  <div className="border-end">
                    <div className="text-dark fw-bold">
                      {item.location || "Online"}
                    </div>
                    <small className="text-muted">Location</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-end">
                    <div className="text-success fw-bold">
                      {item.meetingFrequency || "N/A"}
                    </div>
                    <small className="text-muted">Frequency</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-info fw-bold">
                    {item.nextMeeting
                      ? new Date(item.nextMeeting).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "TBD"}
                  </div>
                  <small className="text-muted">Next Meeting</small>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mt-auto">
              <JoinClubButton clubId={item.id} className="flex-fill btn-sm" />

              <NavLink
                to={`/club/${item.id}`}
                className="btn btn-outline-success btn-sm flex-fill"
              >
                <MdVisibility className="me-1" />
                View Details
              </NavLink>
            </div>
          </div>

          <div className="card-footer bg-light border-0 px-4 py-3 mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <strong>Joined:</strong>{" "}
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </small>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <strong>Tags:</strong>
                <div className="d-flex gap-1">
                  {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="badge bg-secondary small">
                      {tag}
                    </span>
                  ))}
                </div>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
