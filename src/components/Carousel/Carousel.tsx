import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"


type CarouselProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
};

export default function Carousel<T>({ data, renderItem }: CarouselProps<T>) {
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
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
            {data.map((item, index) => (
                <div key={index} className="px-2">
                    {renderItem(item, index)}
                </div>
            ))}
            </Slider>
        </div>
    );
}