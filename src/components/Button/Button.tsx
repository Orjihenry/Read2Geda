

type ButtonProps = {
  ariaExpanded?: boolean;
  ariaControls?: string;
  dataBsToggle?: string;
  dataBsTarget?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  ariaExpanded,
  ariaControls,
  dataBsToggle,
  dataBsTarget,
  disabled = false,
  className = "",
  children,
  label,
  onClick,
  type = "button",
}: ButtonProps) {

  return (
    <button
      type={type}
      className={`btn ${className}`}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
      disabled={disabled}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
}
