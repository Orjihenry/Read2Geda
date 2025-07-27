import { defaultBookClubs } from "../../utils/bookClub";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import NavButton from "../NavButton";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"

export default function Carousel() {
    useEffect(() => {
        const cards = document.querySelectorAll('.card-custom-wrapper');
        let maxHeight = 0;

        cards.forEach((card) => {
            const h = card.getBoundingClientRect().height;
            if (h > maxHeight) maxHeight = h;
        });

        cards.forEach((card) => {
            (card as HTMLElement).style.height = `${maxHeight}px`;
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        centerMode: true,
        centerPadding: "20px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="slider-container">
            <Slider {...settings}>
            {defaultBookClubs.map((item, index) => (
            <div key={index} className="px-2">
                <div className="p-3 border rounded shadow-sm bg-light card-custom-wrapper">
                    <div className="d-flex text-start align-items-center">
                        <div className="flex-shrink-0 me-3">
                            <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="rounded-circle"
                            style={{ width: "64px", height: "64px" }}
                            />
                        </div>

                        <div className="flex-grow-1">
                            <h5 className="mb-1 fw-bold">{item.name}</h5>
                            <p className="mb-1 text-muted">{item.description}</p>

                        </div>
                    </div>
                    <div className="d-flex mt-2 justify-content-center gap-2">
                        <p className="mb-0 small px-2 border-right">Location: {item.location || "Online"}</p>
                        <p className="mb-0 small"> Members: {item.members.length}</p>
                    </div>
                    <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                            <span className="me-2">⭐ Rating:</span>
                            <div className="d-flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={`star ${i < item.rating ? "filled" : ""}`}>★</span>
                                ))}
                            </div>
                        </div>
                        <p className="mb-1 small text-muted"><span className="font-weight-bold">🏷️ Tags:</span> {item.tags?.join(", ") || "None"}</p>
                        <p className="mb-1 small">📅 Next Meeting: {item.nextMeeting ? new Date(item.nextMeeting).toLocaleDateString() : "N/A"}</p>
                    </div>
                    <div className="d-flex gap-2 pt-2 justify-content-center">
                        <NavButton className="btn-dark text-light btn-sm" href={`#/book-club/${item.id}`} label="Join Club" />
                        <NavButton className="btn-outline-primary btn-sm" href={`#/book-club/${item.id}`} label="View Details" />
                    </div>
                </div>
            </div>
            ))}
            </Slider>
        </div>
    );
}