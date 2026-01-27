import { type BookData } from "../utils/bookData";
import { useMemo } from "react";
import { MdAddLocationAlt, MdPeopleAlt, MdStar, MdCalendarToday, MdCheckCircle } from "react-icons/md";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { confirmAlert, notifyAlert } from "../alerts/sweetAlert";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useAuthContext } from "../context/AuthContext";
import { useBookRatingPrompt } from "../hooks/useBookRating";
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
  showRating?: boolean;
  onProgressChange?: (progress: number) => void;
  startedAt?: string;
  completedAt?: string;
};

export default function BookCard({ item, actions = [], progress, showProgress = false, showRating = true, onProgressChange, startedAt, completedAt }: BookCardProps) {
  const { setUserBookRating, getUserBookRating } = useSavedBooks();
  const { users } = useAuthContext();
  const { promptForRating } = useBookRatingPrompt();
  const userRating = getUserBookRating(item.id);
  const ratingValue = userRating ?? item.rating ?? 0;
  const rating = Math.round(ratingValue * 10) / 10;
  const hasRating = userRating != null || item.rating != null;
  const { averageRating, ratingsCount } = useMemo(() => {
    if (!users?.length) {
      return { averageRating: 0, ratingsCount: 0 };
    }

    const ratings = users
      .map((user) => user.books?.[item.id]?.rating)
      .filter((value): value is number => typeof value === "number");

    const count = ratings.length;
    const avg = count ? ratings.reduce((sum, value) => sum + value, 0) / count : 0;

    return {
      averageRating: Math.round(avg * 10) / 10,
      ratingsCount: count,
    };
  }, [users, item.id]);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat().format(value);
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const date = dayjs(dateString);
    if (date.isValid()) {
      return date.format("MMM DD, YYYY");
    }
    return dateString;
  };

  const handleProgressChange = async (newProgress: number) => {
    if (!onProgressChange) return;

    if (progress === 100 && newProgress < 100) {
      const { isConfirmed } = await confirmAlert({
        title: "Update Progress?",
        text: `This will remove "${item.title}" from your completed books section. The completed date will be reset.`,
        icon: "warning",
        confirmText: "Yes, Update Progress",
        cancelText: "Cancel",
      });

      if (isConfirmed) {
        onProgressChange(newProgress);
      }
    } else if (newProgress === 100 && progress !== 100) {
      const { isConfirmed } = await confirmAlert({
        title: "Mark as Completed?",
        text: `"${item.title}" will be moved to your completed books section.`,
        icon: "question",
        confirmText: "Yes, Mark as Completed",
        cancelText: "Cancel",
      });

      if (isConfirmed) {
        const ratingValue = await promptForRating(item.title);
        
        if (ratingValue != null) {
          setUserBookRating(item.id, ratingValue);
        }

        onProgressChange(100);
        notifyAlert({
          title: "Completed!",
          text: `"${item.title}" has been marked as completed.`,
          icon: "success",
          options: {
            timer: 2000,
            showConfirmButton: true,
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
          <small className="text-muted">Progress:</small>
          <small className="text-muted fw-medium ms-1">{currentProgress}%</small>
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
            disabled={progress === 100}
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
        <div className="text-center mb-2">
          <img
            src={item.coverImage}
            alt={item.title}
            className="img-fluid rounded mx-auto"
            style={{ maxHeight: "140px", maxWidth: "100px", objectFit: "cover" }}
          />
        </div>

        <h5
          className="fw-semibold mb-1 text-primary text-truncate fs-5"
          title={item.title}
        >
          {item.title}
        </h5>

        <div className="mt-3" style={{ fontSize: "0.875rem" }}>
          <p className="mb-1 small d-flex align-items-center text-muted">
            <span className="me-2 text-muted">
              <MdAddLocationAlt />
            </span>
            <span className="fw-semibold text-muted">Published:</span>
            <span className="ms-1 fw-medium">
              {item.publishedYear || "Unknown"}
            </span>
          </p>

          <p className="mb-1 small d-flex align-items-center text-muted">
            <span className="me-2 text-muted">
              <MdPeopleAlt />
            </span>
            <span className="fw-semibold text-muted">Author:</span>
            <span className="ms-1 fw-medium">{item.author || "Unknown"}</span>
          </p>

          {showRating && hasRating && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-your-rating-${item.id}`}>Your Rating: {rating}</Tooltip>}
            >
              <p className="d-flex align-items-center small text-muted mb-1 cursor-pointer">
                <span className="me-2 text-muted">
                  <MdStar />
                </span>
                <span className="fw-semibold text-muted">Your Rating:</span>
                <span className="d-flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < ratingValue ? "text-warning" : "text-muted"}
                      style={{ fontSize: "1rem", lineHeight: 1 }}
                    >
                      ★
                    </span>
                  ))}
                </span>
              </p>
            </OverlayTrigger>
          )}

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-average-rating-${item.id}`}>Global Rating: {averageRating}</Tooltip>}
          >
            <p className="d-flex align-items-center small text-muted mb-1 cursor-pointer">
              <span className="me-2 text-muted">
                <MdStar />
              </span>
              <span className="fw-semibold text-muted">Rating:</span>
              <span className="d-flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < averageRating ? "text-warning" : "text-muted"}
                      style={{ fontSize: "1rem", lineHeight: 1 }}
                    >
                      ★
                    </span>
                  ))}
                  <span className={'{ratingsCount > 0 ? "text-muted ms-2" : "d-none"}'}>({formatNumber(ratingsCount)})</span>
                </span>
            </p>
          </OverlayTrigger>

          {startedAt && (progress === undefined || progress > 0) && (
            <p className="mb-1 small d-flex align-items-center text-muted">
              <span className="me-2 text-muted">
                <MdCalendarToday />
              </span>
              <span className="fw-semibold text-muted">Started:</span>
              <span className="ms-1 fw-medium">{formatDate(startedAt)}</span>
            </p>
          )}

          {completedAt && (progress === undefined || progress === 100) && (
            <p className="mb-1 small d-flex align-items-center text-success">
              <span className="me-2">
                <MdCheckCircle />
              </span>
              <span className="fw-semibold text-muted">Completed:</span>
              <span className="ms-1 fw-medium">{formatDate(completedAt)}</span>
            </p>
          )}
        </div>
      </div>

       <div className="mt-3 pt-3 border-top">
         {renderProgressBar()}
         {renderActionButtons()}
       </div>
    </div>
  );
}
