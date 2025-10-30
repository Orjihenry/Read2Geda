type NavButtonProps = {
  children?: React.ReactNode;
  className?: string;
  label: string;
  href: string;
};

export default function NavButton({
  label,
  href,
  children,
  className,
}: NavButtonProps) {
  return (
    <a href={href} className={`btn btn-outline-success ${className}`}>
      {children || label}
    </a>
  );
}
