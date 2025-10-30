import { type BookData } from "../utils/bookData";
import {
  MdAddLocationAlt,
  MdOutlineFavorite,
  MdPeopleAlt,
  MdStar,
} from "react-icons/md";
import { IoMdClose, IoMdPricetag } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";
import { useSavedBooks } from "../context/SavedBooksContext";
import { useAuthContext } from "../context/AuthContext";

type bookCardProps = {
  index: number;
  item: BookData;
};

export default function BookCard({ index, item }: bookCardProps) {
  const { addBook, removeBook, isInShelf, getUserBookProgress } =
    useSavedBooks();
  const { currentUser } = useAuthContext();
  const inShelf = isInShelf(item.id);

  const userBookProgress = getUserBookProgress(currentUser?.id || "", item.id);
  const hasStartedReading =
    userBookProgress === 0 || userBookProgress === undefined ? false : true;

  const handleReadClick = () => {
    console.log(`Opening book: ${item.title}`);
  };

  return (
    <>
      <div
        key={index}
        className="p-3 rounded-3 shadow-sm bg-white border card-custom-wrapper transition-all hover:shadow-lg h-100 d-flex flex-column justify-content-between"
      >
        <div>
          <div className="d-flex justify-content-between text-center mb-3">
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

            <div className="d-flex align-items-center small text-secondary mb-1">
              <span className="me-2 text-muted">
                <MdStar />
              </span>
              <span className="me-1">Rating:</span>
              <div className="d-flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`star ${
                      i < 5 ? "filled text-warning" : "text-muted"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

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
          {inShelf ? (
            <>
              {hasStartedReading && (
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Progress</small>
                    <small className="text-muted">
                      {userBookProgress || 0}%
                    </small>
                  </div>
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${userBookProgress || 0}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="d-flex gap-2">
                <button
                  className={`btn flex-fill ${
                    hasStartedReading ? "btn-outline-success" : "btn-success"
                  }`}
                  onClick={handleReadClick}
                >
                  <MdPlayArrow className="me-1" />
                  {hasStartedReading ? "Continue Reading" : "Start Reading"}
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeBook(item.id)}
                  title="Remove from Shelf"
                >
                  <IoMdClose />
                </button>
              </div>
            </>
          ) : (
            <button
              className="btn btn-outline-success w-100"
              onClick={() => addBook(item)}
              title="Add to Shelf"
            >
              <MdOutlineFavorite className="me-1" />
              Add to Shelf
            </button>
          )}
        </div>
      </div>
    </>
  );
}
