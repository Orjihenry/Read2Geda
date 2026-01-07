import { type BookData } from "../utils/bookData";
import { MdAddLocationAlt, MdPeopleAlt, MdStar, MdCalendarToday, MdCheckCircle } from "react-icons/md";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "../styles/BookCard.css";

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
  onProgressChange?: (progress: number) => void;
  startedAt?: string;
  completedAt?: string;
};

export default function BookCard({ item, actions = [], progress, showProgress = false, onProgressChange, startedAt, completedAt }: BookCardProps) {
  const rating = Math.round((item.rating || 0) * 10) / 10;
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const date = dayjs(dateString);
    if (date.isValid()) {
      return date.format("MMM DD, YYYY");
    }
    return dateString;
  };
  
  const handleMarkAsCompleted = async () => {
    if (!onProgressChange) return;
    
    const { isConfirmed } = await Swal.fire({
      title: "Mark as Completed?",
      text: `"${item.title}" will be moved to your completed books section.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark as Completed",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-success",
      },
    });

    if (isConfirmed) {
      onProgressChange(100);
      Swal.fire({
        title: "Completed!",
        text: `"${item.title}" has been marked as completed.`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: true,
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const handleResetProgress = async () => {
    if (!onProgressChange) return;
    
    const { isConfirmed } = await Swal.fire({
      title: "Reset Progress?",
      text: `This action will remove "${item.title}" from your completed books section and all metadata will be lost.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Reset",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-success",
      },
    });

    if (isConfirmed) {
      onProgressChange(0);
      Swal.fire({
        title: "Reset!",
        text: `Progress for "${item.title}" has been reset.`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: true,
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const handleProgressChange = async (newProgress: number) => {
    if (!onProgressChange) return;

    if (progress === 100 && newProgress < 100) {
      const { isConfirmed } = await Swal.fire({
        title: "Update Progress?",
        text: `This will remove "${item.title}" from your completed books section. The completed date will be reset.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update Progress",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-outline-success",
        },
      });

      if (isConfirmed) {
        onProgressChange(newProgress);
      }
    } else if (newProgress === 100 && progress !== 100) {
      const { isConfirmed } = await Swal.fire({
        title: "Mark as Completed?",
        text: `"${item.title}" will be moved to your completed books section.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Mark as Completed",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-outline-success",
        },
      });

      if (isConfirmed) {
        onProgressChange(100);
        Swal.fire({
          title: "Completed!",
          text: `"${item.title}" has been marked as completed.`,
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: true,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    } else {
      onProgressChange(newProgress);
    }
  };

  const renderProgressBar = () => {
    if (!showProgress || progress === undefined) return null;
    
    const currentProgress = progress || 0;
    
    return (
      <div className="mb-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div>
            <small className="text-muted">Progress:</small>
            <small className="text-muted fw-medium ms-1">{currentProgress}%</small>
          </div>
          <div>
            {onProgressChange ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-completed-${item.id}`}>
                    {currentProgress === 100 ? "Reset progress to 0%?" : "Mark as completed?"}
                  </Tooltip>
                }
              >
                <small 
                  className="book-completed-text"
                  onClick={currentProgress === 100 ? handleResetProgress : handleMarkAsCompleted}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (currentProgress === 100) {
                        handleResetProgress();
                      } else {
                        handleMarkAsCompleted();
                      }
                    }
                  }}
                >
                  {currentProgress === 100 ? "Reset" : "Completed"}
                </small>
              </OverlayTrigger>
            ) : (
              <small className="text-muted">Completed</small>
            )}
          </div>
        </div>
        {onProgressChange ? (
          <input
            type="range"
            className="form-range book-progress-range"
            style={{ "--progress": `${currentProgress}%` } as React.CSSProperties}
            min={0}
            max={100}
            step={1}
            value={currentProgress}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
          />
        ) : (
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        )}
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
            overlay={<Tooltip id={`tooltip-${item.id}-${action.key}`}>{action.title || action.label}</Tooltip>}
          >
            <Button
              variant="null"
              className={action.className}
              disabled={action.disabled}
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
        {/* <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">AI Generated Summary</Tooltip>}
        >
          <p className="text-muted small mb-2 help" style={{ minHeight: "3rem" }}>
            {item.summary?.length > 100
              ? item.summary.slice(0, 100) + "..."
              : item.summary}
          </p>
        </OverlayTrigger> */}

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
              overlay={<Tooltip id={`tooltip-rating-${item.id}`}>{rating} / 5</Tooltip>}
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

          {startedAt && (progress === undefined || progress > 0) && (
            <p className="mb-1 small d-flex align-items-center text-secondary">
              <span className="me-2 text-muted">
                <MdCalendarToday />
              </span>
              Started:{" "}
              <span className="ms-1 fw-medium">{formatDate(startedAt)}</span>
            </p>
          )}

          {completedAt && (progress === undefined || progress === 100) && (
            <p className="mb-1 small d-flex align-items-center text-success">
              <span className="me-2">
                <MdCheckCircle />
              </span>
              Completed:{" "}
              <span className="ms-1 fw-medium">{formatDate(completedAt)}</span>
            </p>
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
