/* eslint-disable react/prop-types */
// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#686D76" }}
      onClick={onClick}
    />
  );
}

function ResponsiveSlider({ testimonials }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white h-[450px] text-black rounded-xl">
              <div className='h-56 bg-gray-500 flex justify-center items-center rounded-t-xl'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-44 w-44 rounded-full"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{testimonial.name}</p>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-300">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-center">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ResponsiveSlider;
