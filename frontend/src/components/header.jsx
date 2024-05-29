
import header from "../assets/header.jpg";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaSearch } from "react-icons/fa";

function Header() {
  return (
    <div>
      <div className="flex flex-row justify-between h-20 items-center bg-white px-6">
        <div>
          <h6 className="font-extrabold text-lg">
            <span className="text-black">Event</span>
            <span className="text-[#DBB610]">Center</span>
          </h6>
        </div>
        <div className="flex flex-row gap-4 text-black font-semibold">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about-us">About Us</Link>
          <div className="flex items-center gap-2">
            <Link to="/register">
              <button className="bg-green-500 flex items-center rounded-md h-8 px-2 hover:bg-green-600">
                <FaUserPlus className="mr-2" />
                <span>Register Here</span>
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-red-500 flex items-center rounded-md h-8 px-2 hover:bg-red-600">
                <FaSignInAlt className="mr-2" />
                <span>Log In</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[80vh] text-white flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to Event Center
        </h1>
        <p className="text-lg text-center mb-6">
          Find and register for the best events around you.
        </p>
        <div className="flex items-center gap-2">
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
    </div>
  );
}

export default Header;
