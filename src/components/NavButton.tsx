import { NavLink } from "react-router-dom";

type NavButtonProps = {
  children?: React.ReactNode;
  className?: string;
  label: string;
  href: string;
  onClick?: () => void;
};

export default function NavButton({
  label,
  href,
  children,
  className,
  onClick,
}: NavButtonProps) {
  if (href === "#") {
    return (
      <button
        onClick={onClick}
        className={`btn btn-outline-success ${className}`}
      >
        {children || label}
      </button>
    );
  }

  return (
    <NavLink to={href} className={`btn btn-outline-success ${className}`}>
      {children || label}
    </NavLink>
  );
}
