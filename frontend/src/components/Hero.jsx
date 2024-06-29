import { useEffect } from "react";
import header from "../assets/header.jpg";
import header2 from "../assets/header 2.jpg";
import header3 from "../assets/header 3.jpg";
import header4 from "../assets/header 4.jpg";
import { FaSearch } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

function Hero({ searchQuery, handleSearchChange }) {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div
      className="w-full h-screen text-white flex flex-col justify-center items-center relative"
      style={{
        animation: "slideshow 16s infinite",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
        @keyframes slideshow {
          0%, 100% { background-image: url(${header}); }
          25% { background-image: url(${header2}); }
          50% { background-image: url(${header3}); }
          75% { background-image: url(${header4}); }
        }
      `}</style>
      <h1
        className="text-3xl lg:text-5xl font-bold text-center mb-4"
        data-aos="fade-left"
      >
        Welcome to Event Center
      </h1>
      <p className="text-lg text-center mb-6" data-aos="fade-right">
        Find and register for the best events around you.
      </p>
      <div
        className="flex flex-col md:flex-row items-center text-black gap-2"
        data-aos="flip-up"
      >
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-sm h-10 md:w-[22rem] px-3 font-semibold"
        />
      </div>
    </div>
  );
}

export default Hero;
