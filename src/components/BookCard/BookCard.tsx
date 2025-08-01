import { type BookData } from "../../utils/bookData"
import { MdAddLocationAlt, MdPeopleAlt, MdStar } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";

type bookCardProps = {
    index: number
    item: BookData,
}

export default function BookCard({ index, item }: bookCardProps) {
  return (
    <>
      <div
        key={index}
        className="p-3 rounded-3 shadow-sm bg-white border card-custom-wrapper transition-all hover:shadow-lg h-100 d-flex flex-column justify-content-between"
      >
        <div>
          <div className="d-flex justify-content-around text-center mb-3">
            <img
              src={item.coverImage}
              alt={item.title}
              className="img-fluid rounded"
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

            <p className="small d-flex align-items-center text-secondary">
              <span className="me-2 text-muted">
                <IoMdPricetag />
              </span>
              Tags:{" "}
              <span className="ms-1">{item.tags?.join(", ") || "None"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
