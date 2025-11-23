import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  maxWidth?: "500px" | "800px" | "1000px";
  footer?: React.ReactNode;
  showFooter?: boolean;
};

export default function Modal({ isOpen, onClose, title, children, maxWidth = "500px", footer, showFooter = true }: ModalProps) {

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1050,
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded shadow-lg"
        style={{
          width: "90%",
          maxWidth,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          {title && <h5 className="m-0 fw-bold">{title}</h5>}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>

        <div className="p-3" style={{ overflowY: "auto", flex: 1 }}>
          {children}
        </div>

        {showFooter && (
          <div className="border-top p-3">
            {footer || (
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}