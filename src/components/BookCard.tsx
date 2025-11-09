import { type BookData } from "../utils/bookData";
import {
  MdAddLocationAlt,
  MdOutlineFavorite,
  MdPeopleAlt,
  MdStar,
  MdPlayArrow,
} from "react-icons/md";
import { IoMdClose, IoMdPricetag } from "react-icons/io";
import { useAuthContext } from "../context/AuthContext";
import { useSavedBooks } from "../context/SavedBooksContext";

export type BookCardActions = {
  onAdd?: () => void;
  onRemove?: () => void;
  onReadClick?: () => void;
};

export type BookCardProps = {
  item: BookData;
  actions?: BookCardActions;
};

export default function BookCard({ item, actions = {} }: BookCardProps) {
  const { onAdd, onRemove, onReadClick } = actions;
  const { getUserBookProgress } = useSavedBooks();
  const { currentUser } = useAuthContext();
  
  const userId = currentUser?.id || "";
  const userBookProgress = getUserBookProgress(userId, item.id);
  const hasStartedReading = userBookProgress > 0;

  const renderProgressBar = (label: string) => (
    <div className="mb-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-muted">{label}</small>
        <small className="text-muted">{userBookProgress || 0}%</small>
      </div>
      <div className="progress" style={{ height: "4px" }}>
        <div
          className="progress-bar bg-success"
          style={{ width: `${userBookProgress || 0}%` }}
        />
      </div>
    </div>
  );

  const renderActionButtons = () => {
    const buttons = [];

    if (onReadClick) {
      buttons.push(
        <button
          key="read"
          className={`btn ${hasStartedReading ? "btn-outline-success" : "btn-success"} ${onRemove ? "flex-fill" : "w-100"}`}
          onClick={onReadClick}
        >
          <MdPlayArrow className="me-1" />
          {hasStartedReading ? "Continue Reading" : "Start Reading"}
        </button>
      );
    }

    if (onRemove) {
      buttons.push(
        <button
          key="remove"
          className={`btn btn-outline-danger ${onReadClick ? "" : "w-100"}`}
          onClick={onRemove}
          title="Remove"
        >
          <IoMdClose className={onReadClick ? "" : "me-1"} />
          {onReadClick ? "" : "Remove"}
        </button>
      );
    }

    if (onAdd) {
      buttons.push(
        <button
          key="add"
          className={`btn btn-outline-success ${onReadClick || onRemove ? "flex-fill" : "w-100"}`}
          onClick={onAdd}
          title="Add"
        >
          <MdOutlineFavorite className="me-1" />
          Add
        </button>
      );
    }

    if (buttons.length === 0) {
      return null;
    }

    if (buttons.length > 1) {
      return <div className="d-flex gap-2">{buttons}</div>;
    }

    return buttons[0];
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
        <p className="text-muted small mb-2" style={{ minHeight: "3rem" }}>
          {item.summary?.length > 100
            ? item.summary.slice(0, 100) + "..."
            : item.summary}
        </p>

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
            <div className="d-flex align-items-center small text-secondary mb-1">
              <span className="me-2 text-muted">
                <MdStar />
              </span>
              <span className="me-1">Rating:</span>
              <div className="d-flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < (item.rating ?? 0) ? "text-warning" : "text-muted"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="mb-1 small d-flex align-items-center text-secondary">
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
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-top">
        {renderProgressBar("Progress")}
        {renderActionButtons()}
      </div>
    </div>
  );
}
