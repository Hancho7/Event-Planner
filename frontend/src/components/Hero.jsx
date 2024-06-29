import { useEffect } from "react";
import header from "../assets/header.jpg";
import header2 from "../assets/header 2.jpg";
import header3 from "../assets/header 3.jpg";
import header4 from "../assets/header 4.jpg";
import { FaSearch } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel CSS

function Hero({ searchQuery, handleSearchChange }) {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div className="w-full h-screen text-white flex flex-col justify-center items-center relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={4000}
        transitionTime={1000}
        className="absolute inset-0 w-full h-full z-[-1]"
      >
        <div>
          <img src={header} alt="Header 1" className="w-full h-full object-fill" />
        </div>
        <div>
          <img src={header2} alt="Header 2" className="w-full h-full object-fill" />
        </div>
        <div>
          <img src={header3} alt="Header 3" className="w-full h-full object-fill" />
        </div>
        <div>
          <img src={header4} alt="Header 4" className="w-full h-full object-fill" />
        </div>
      </Carousel>

      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-4" data-aos="fade-left">
        Welcome to Event Center
      </h1>
      <p className="text-lg text-center mb-6" data-aos="fade-right">
        Find and register for the best events around you.
      </p>
      <div className="flex flex-col md:flex-row items-center text-black gap-2" data-aos="flip-up">
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
