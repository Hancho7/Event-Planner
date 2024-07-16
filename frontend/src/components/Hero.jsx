import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import header from "../assets/header.jpg";
import header2 from "../assets/header 2.jpg";
import header12 from "../assets/header 12.jpeg";
import Aos from "aos";
import "aos/dist/aos.css";

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <Carousel
        infiniteLoop
        autoPlay
        interval={8000}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={header}
            alt="Header"
            onLoad={handleImageLoad}
          />
        </div>
        <div>
          <img
            loading="lazy"
            className="w-full h-full object-cover"
            src={header2}
            alt="Header 2"
          />
        </div>
        <div>
          <img
            loading="lazy"
            className="w-full h-full object-cover"
            src={header12}
            alt="Header 12"
          />
        </div>
      </Carousel>
      <div className="absolute flex flex-col items-center justify-center text-white text-center z-10">
        <h1
          className="text-4xl lg:text-5xl font-bold mb-4"
          data-aos="fade-left"
        >
          Welcome to Event Center
        </h1>
        <p className="text-2xl mb-6 text-white" data-aos="fade-left">
          Your one-stop solution for managing and booking events seamlessly.
          Whether you're an event planner or someone looking to host a memorable
          occasion,EventCenter is here to make it easy and efficient for you.
        </p>
        <p className="text-lg mb-6" data-aos="fade-right">
          Find and register for the best events around you.
        </p>
      </div>
    </div>
  );
}

export default Hero;
