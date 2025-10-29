import { MdPeopleAlt, MdStar, MdVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { bookClub } from "../../utils/bookClub";
import { useImageStorage } from "../../hooks/useImageStorage";
import JoinClubButton from "../JoinClubButton";
import placeholderClubImage from "../../assets/bookClub.jpg";

type clubCardProps = {
  index: number;
  item: bookClub;
};

export default function ClubCard({ index, item }: clubCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { getImage } = useImageStorage();

  useEffect(() => {
    let revokeUrl: string | null = null;

    const loadImage = async () => {
      if (!item.imageUrl) {
        setImageUrl(placeholderClubImage);
        return;
      }

      if (item.imageUrl.length === 36 && !item.imageUrl.includes("/")) {
        const blob = await getImage(item.imageUrl);
        if (blob) {
          const url = URL.createObjectURL(blob);
          revokeUrl = url;
          setImageUrl(url);
        } else {
          setImageUrl(placeholderClubImage);
        }
      } else {
        setImageUrl(item.imageUrl);
      }
    };

    loadImage();

    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [item.imageUrl, getImage]);

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
      <div key={index} className="card h-100 border-0 shadow-sm hover-lift border rounded shadow-sm bg-light">
        <div className="slider-container">
          <div className="">
            <div className="card-body p-0 p-sm-4">
              <div className="d-flex align-items-start mb-3">
                <div className="flex-shrink-0 me-3">
                  <img
                    src={imageUrl || placeholderClubImage}
                    alt={item.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      maxWidth: "60px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-grow-1">
                  <div className="flex-grow-1">
                    <h6 className="card-title mb-1 fw-bold">{item.name}</h6>
                    <p className="text-muted small mb-2">{item.description}</p>
                    <div className="d-flex align-items-center">
                      <span>
                        <MdPeopleAlt className="" />
                        <span className="badge bg-light text-dark">
                          {item.members.length}
                        </span>
                      </span>
                      <span>
                        <MdStar className="" />
                        <span className="badge bg-warning text-dark">
                          {item.rating}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 small">
                <div className="row g-2 text-center">
                  <div className="col-4">
                    <div className="border-end">
                      <div className="text-dark fw-bold">{item.location || "Online"}</div>
                      <small className="text-muted">Location</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="border-end">
                      <div className="text-success fw-bold">{item.meetingFrequency || "N/A"}</div>
                      <small className="text-muted">Frequency</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="text-info fw-bold">
                      {item.nextMeeting 
                        ? new Date(item.nextMeeting).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : "TBD"
                      }
                    </div>
                    <small className="text-muted">Next Meeting</small>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
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

            <div className="card-footer bg-light border-0 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  <strong>Joined:</strong> {new Date(item.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
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
      </div>
    </>
  );
}
