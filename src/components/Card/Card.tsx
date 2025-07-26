import './Card.css'

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  imgSrc?: string;
  imgAlt: string;
  title?: string;
  text?: string;
}

export default function Card({ children, className = "", style = {}, imgSrc, imgAlt = "", title, text,
}: CardProps) {
  return (
    <div className={`card mb-5 ${className}`} style={style}>
      {imgSrc && <img className="card-img-top" src={imgSrc} alt={imgAlt} />}
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {text && <p className="card-text">{text}</p>}
        {children}
      </div>
    </div>
  );
}
