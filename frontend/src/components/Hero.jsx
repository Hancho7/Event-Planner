import { useEffect } from "react";
import header from "../assets/header.jpg";
import { FaSearch } from "react-icons/fa";
import Aos from "aos"
import "aos/dist/aos.css";
function Hero() {
  useEffect(()=>{
    Aos.init({duration:3000});
  },[])
  return (
    <div
      className="w-full h-screen text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold  text-center mb-4" data-aos="fade-left">
        Welcome to Event Center
      </h1>
      <p className="text-lg text-center mb-6" data-aos="fade-right">
        Find and register for the best events around you.
      </p>
      <div className="flex items-center text-black font-sans gap-2" data-aos="flip-up">
        <input
          type="text"
          placeholder="Search events..."
          className="rounded-sm h-10 w-[22rem] px-3 font-semibold"
        />
        <button className="bg-[#ffdd50] text-black flex items-center font-semibold rounded-sm h-10 px-3 hover:bg-[#d8bc4c]">
          <FaSearch className="mr-2" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

export default Hero;
