import { useEffect, useState } from "react";
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
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={header}
          alt="Header"
          onLoad={handleImageLoad}
        />
        <img
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          src={header2}
          alt="Header 2"
        />
        <img
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          src={header12}
          alt="Header 12"
        />
      </div>
      <div className="absolute flex flex-col items-center justify-center text-white text-center z-10">
        <h1
          className="text-3xl lg:text-5xl font-bold mb-4"
          data-aos="fade-left"
        >
          Welcome to Event Center
        </h1>
        <p className="text-lg mb-6" data-aos="fade-right">
          Find and register for the best events around you.
        </p>
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
        .absolute img:nth-child(1) {
          animation: slideshow 24s infinite;
        }
        .absolute img:nth-child(2) {
          animation: slideshow 24s infinite 8s;
        }
        .absolute img:nth-child(3) {
          animation: slideshow 24s infinite 16s;
        }
      `}</style>
    </div>
  );
}

export default Hero;
