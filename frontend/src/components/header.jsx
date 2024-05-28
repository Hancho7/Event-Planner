import header from "../assets/header.jpg";
import { Form, Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaSearch } from "react-icons/fa"; 

function Header() {
  const events = [
    {
      id: 1,
      title: "Event 1",
      description: "Description for event 1",
      image: "event 1.jpeg",
    },
    {
      id: 2,
      title: "Event 2",
      description: "Description for event 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Event 3",
      description: "Description for event 3",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Event 4",
      description: "Description for event 4",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Event 5",
      description: "Description for event 5",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Event 6",
      description: "Description for event 6",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      title: "Event 7",
      description: "Description for event 7",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      title: "Event 8",
      description: "Description for event 8",
      image: "https://via.placeholder.com/150",
    },
  ];

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
        <h1 className="text-3xl font-bold text-center mb-4">
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
          <button className="bg-[#ffdd50] flex items-center rounded-md h-8 px-2 hover:bg-[#d8bc4c]">
            <FaSearch className="mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className="w-full py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Awesome Events</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden w-64"
            >
              <img
                src={"../assets/event 1.jpeg"}
                alt={event.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
