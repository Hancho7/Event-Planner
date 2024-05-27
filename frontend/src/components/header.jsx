import header from "../assets/header.jpg";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <div className="flex flex-row justify-between h-20 items-center bg-[#333] px-6">
        <div>
          <h6 className=" font-extrabold text-lg">
            <span className=" text-black">Event</span>
            <span className=" text-[#DBB610]">Center</span>
          </h6>
        </div>
        <div className="flex flex-row gap-4 text-white font-semibold">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/register">Register Here</Link>
        </div>
        <div className=" flex items-center flex-row gap-2">
          <input type="text" placeholder="Search events..." className=" rounded-md h-8 p-1" />
          <button className=" bg-[#ffdd50] rounded-md h-8 px-2 hover:bg-[#d8bc4c]">
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className="w-full h-[80vh]">
        <img
          src={header}
          alt="Header image loading..."
          className=" h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Header;
