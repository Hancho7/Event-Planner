/* eslint-disable react/prop-types */
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow />,
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
    <div className="slider-container px-6">
        <Slider {...settings} >
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md w-40 my-[50%]"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
          <h3 className="text-xl font-semibold text-center mt-4">
            {testimonial.name}
          </h3>
          <div className="flex justify-center mt-2">
            {Array.from({ length: testimonial.rating }, (_, i) => (
              <span key={i} className="text-yellow-500">
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-600 mt-4 text-center">
            {testimonial.feedback}
          </p>
        </div>
      ))}
    </Slider>
    </div>
    
  );
}

export default ResponsiveSlider;
