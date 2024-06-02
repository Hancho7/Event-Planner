import { Link, useLocation } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        // Change 200 to the height you want
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={sticky?{position: "sticky", top:"0"  }: {}}>
      <div className="flex flex-row justify-between h-20 items-center bg-white px-6">
        <div>
          <h6 className="font-extrabold text-lg">
            <span className="text-black">Event</span>
            <span className="text-[#DBB610]">Center</span>
          </h6>
        </div>
        <div className="flex flex-row font-sans gap-4 text-black font-semibold">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about-us">About Us</Link>
          {location.pathname === "/events" ? (
            <button className="bg-blue-500 flex items-center rounded-md h-8 px-2 hover:bg-blue-600">
              Become a Planner
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
