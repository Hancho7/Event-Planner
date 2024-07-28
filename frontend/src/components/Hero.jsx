import { useEffect, useState } from "react";
import header from "../assets/header.jpg";
import header2 from "../assets/header 2.jpg";
import header12 from "../assets/header 12.jpeg";
import Aos from "aos";
import "aos/dist/aos.css";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Aos.init({ duration: 3000 });

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [header, header2, header12];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            src={image}
            alt={`Header ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute flex flex-col items-center justify-center text-white text-center z-10">
        <h1
          className="text-3xl lg:text-5xl font-bold mb-4"
          data-aos="fade-left"
        >
          Welcome to Event Center
        </h1>
        <p className="mt-4 text-lg text-white mb-6">
          Discover upcoming events, highlight special moments, and join our
          vibrant community today!
        </p>
        <p className="text-lg mb-6" data-aos="fade-right">
          Find and register for the best events around you.
        </p>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center pb-4">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentIndex === index ? "bg-blue-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes slideshow {
          0%,
          20%,
          100% {
            opacity: 1;
          }
          33.33%,
          66.66% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;
