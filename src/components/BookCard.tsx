import { type BookData } from "../utils/bookData";
import { MdAddLocationAlt, MdPeopleAlt, MdStar } from "react-icons/md";
// import { IoMdPricetag } from "react-icons/io";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export type BookCardActions = {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
};

export type BookCardProps = {
  item: BookData;
  actions?: BookCardActions[];
  progress?: number;
  showProgress?: boolean;
};

export default function BookCard({ item, actions = [], progress, showProgress = false }: BookCardProps) {
  const rating = Math.round((item.rating || 0) * 10) / 10;
  const renderProgressBar = () => {
    if (!showProgress || progress === undefined) return null;
    
    return (
      <div className="mb-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <small className="text-muted">Progress</small>
          <small className="text-muted">{progress || 0}%</small>
        </div>
        <div className="progress" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress || 0}%` }}
          />
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (actions.length === 0) return null;

    return (
      <div className="d-flex gap-2">
        {actions.map(action => (
        <OverlayTrigger
          key={action.key}
          placement="top"
          overlay={<Tooltip id="tooltip-top">{action.title}</Tooltip>}
        >
          <Button
            key={action.key}
            variant="null"
            className={action.className}
            disabled={action.disabled}
            title={action.title}
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        </OverlayTrigger>
        ))}
      </div>
    );
  };

  return (
    <div
      className="p-3 rounded-3 shadow-sm bg-white border card-custom-wrapper transition-all hover:shadow-lg h-100 d-flex flex-column justify-content-between"
    >
      <div>
        <div className="text-center mb-3">
          <img
            src={item.coverImage}
            alt={item.title}
            className="img-fluid rounded mx-auto"
            style={{ maxHeight: "220px", objectFit: "cover" }}
          />
        </div>

        <h5
          className="fw-semibold mb-1 text-primary text-truncate"
          title={item.title}
        >
          {item.title}
        </h5>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">AI Generated Summary</Tooltip>}
        >
          <p className="text-muted small mb-2 help" style={{ minHeight: "3rem" }}>
            {item.summary?.length > 100
              ? item.summary.slice(0, 100) + "..."
              : item.summary}
          </p>
        </OverlayTrigger>

        <div className="mt-3">
          <p className="mb-1 small d-flex align-items-center text-secondary">
            <span className="me-2 text-muted">
              <MdAddLocationAlt />
            </span>
            Published:{" "}
            <span className="ms-1 fw-medium">
              {item.publishedYear || "Unknown"}
            </span>
          </p>

          <p className="mb-1 small d-flex align-items-center text-secondary">
            <span className="me-2 text-muted">
              <MdPeopleAlt />
            </span>
            Author:{" "}
            <span className="ms-1 fw-medium">{item.author || "Unknown"}</span>
          </p>

          {item.rating != null && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-rating">{rating} / 5</Tooltip>}
            >
              <div className="d-flex align-items-center small text-secondary mb-1">
                <span className="me-2 text-muted">
                  <MdStar />
                </span>
                <span className="me-1">Rating:</span>
                <div className="d-flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < (item.rating || 0) ? "text-warning" : "text-muted"}
                      style={{ fontSize: "1rem", lineHeight: 1 }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </OverlayTrigger>
          )}

          {/* <p className="mb-1 small d-flex align-items-center text-secondary">
            <span className="me-2 text-muted">
              <IoMdPricetag />
            </span>
            Tags:{" "}
            <span className="ms-1 fw-medium">
              {item.tags && item.tags.length > 0
                ? item.tags.slice(0, 2).join(", ") +
                  (item.tags.length > 2 ? "..." : "")
                : "None"}
            </span>
          </p> */}
        </div>
      </div>

       <div className="mt-3 pt-3 border-top">
         {renderProgressBar()}
         {renderActionButtons()}
       </div>
    </div>
  );
}
