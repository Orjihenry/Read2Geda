import { MdPeopleAlt, MdStar, MdCalendarToday, MdMoreVert } from "react-icons/md";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { bookClub } from "../utils/bookClub";
import { useFetchImage } from "../hooks/useFetchImage";
import placeholderClubImage from "../assets/bookClub.jpg";
import { useAuthContext } from "../context/AuthContext";
import { useClub } from "../context/ClubContext";
import "../styles/Profile.css";

type clubCardProps = {
  index: number;
  item: bookClub;
};

export default function ClubCard({ index, item }: clubCardProps) {
  const { imageUrl } = useFetchImage(item.imageUrl, placeholderClubImage);
  const { currentUser } = useAuthContext();
  const { isClubMember, leaveClub, joinClub } = useClub();
  const navigate = useNavigate();
  
  const userId = currentUser?.id;
  const isMember = userId ? isClubMember(item.id, userId) : false;
  const memberInfo = isMember ? item.members.find((m) => m.id === userId) : null;
  const joinedDate = memberInfo?.joinedAt;

  const handleJoinClub = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      navigate("/login");
      return;
    }
    joinClub(item, userId);
  };

  const handleLeaveClub = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) return;
    leaveClub(item.id, userId);
  };

  const handleCardClick = () => {
    navigate(`/club/${item.id}`);
  };
  
  return (
    <>
      <div key={index} className="col-lg-12 col-md-12">
        <div 
          className="card h-100 border shadow-sm club-card-hover d-flex flex-column position-relative"
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
        >
          {currentUser && (
            <div className="dropdown position-absolute" style={{ top: "10px", right: "10px", zIndex: 10 }}>
              <button
                className="btn btn-sm btn-link text-muted p-1"
                type="button"
                id={`clubMenuDropdown-${item.id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                style={{ 
                  border: "none",
                  background: "transparent",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                }}
              >
                <MdMoreVert />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`clubMenuDropdown-${item.id}`}>
                <li>
                  {isMember ? (
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLeaveClub}
                    >
                      Leave Club
                    </button>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={handleJoinClub}
                    >
                      Join Club
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
          <div className="card-body p-4 pb-0">
            <div className="d-flex align-items-start mb-3">
              <div className="flex-shrink-0 me-3">
                <img
                  src={imageUrl || placeholderClubImage}
                  alt={item.name}
                  className="rounded-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    maxWidth: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="flex-grow-1">
                <h6 className="card-title mb-1 fw-bold text-dark">{item.name}</h6>
                <p
                  className="text-secondary small mb-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "#6c757d",
                    fontSize: "0.875rem",
                  }}
                >
                  {item.description}
                </p>
                <div className="d-flex align-items-center gap-3">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-members">Members</Tooltip>}
                  >
                    <span className="d-flex align-items-center">
                      <MdPeopleAlt className="me-1" />
                      <span className="badge bg-light text-dark">
                        {item.members.length}
                      </span>
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-rating">Rating</Tooltip>}
                  >
                    <span className="d-flex align-items-center">
                      <MdStar style={{ color: "#ffc107" }} />
                      <span className="badge bg-light text-dark ms-1">
                        {item.rating}
                      </span>
                    </span>
                  </OverlayTrigger>
                  {isMember && joinedDate && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-joined">
                          Joined {new Date(joinedDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Tooltip>
                      }
                    >
                      <span className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                        <MdCalendarToday className="text-muted" style={{ fontSize: "1rem" }} />
                      </span>
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3 d-flex gap-2 flex-wrap">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-location">Location</Tooltip>}
              >
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#495057",
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.65rem",
                    cursor: "pointer",
                  }}
                >
                  {item.location || "Online"}
                </span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-frequency">Meeting Frequency</Tooltip>}
              >
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#198754",
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.65rem",
                    cursor: "pointer",
                  }}
                >
                  {item.meetingFrequency || "N/A"}
                </span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-next-meeting">Next Meeting Date</Tooltip>}
              >
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#0dcaf0",
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.65rem",
                    cursor: "pointer",
                  }}
                >
                  {item.nextMeeting
                    ? new Date(item.nextMeeting).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "TBD"}
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className="card-footer bg-light border-0 px-4 py-3 pt-0 mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                <span className="text-muted" style={{ opacity: 0.7 }}>Tags:</span>
                <div className="d-flex gap-1 ms-1">
                  {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="badge"
                      style={{
                        backgroundColor: "#e9ecef",
                        color: "#6c757d",
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.4rem",
                        fontWeight: "normal",
                      }}
                    >
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
