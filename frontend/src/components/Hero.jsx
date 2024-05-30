import header from "../assets/header.jpg";
import { FaSearch } from "react-icons/fa";
function Hero() {
  return (
    <div
      className="w-full h-[80vh] text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold font-mono text-center mb-4">
        Welcome to Event Center
      </h1>
      <p className="text-lg text-center mb-6">
        Find and register for the best events around you.
      </p>
      <div className="flex items-center text-black font-sans gap-2">
        <input
          type="text"
          placeholder="Search events..."
          className="rounded-md h-8 p-1"
        />
        <button className="bg-[#ffdd50] text-black flex items-center rounded-md h-8 px-2 hover:bg-[#d8bc4c]">
          <FaSearch className="mr-2" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

export default Hero;
