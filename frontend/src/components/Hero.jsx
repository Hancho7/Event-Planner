import { useEffect } from "react";
import header from "../assets/header.jpg";
import { FaSearch } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

function Hero({ searchQuery, handleSearchChange }) {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div
      className="w-full h-screen text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
        <FaSearch className="text-gray-400" />
      </div>
    </div>
  );
}

export default Hero;
